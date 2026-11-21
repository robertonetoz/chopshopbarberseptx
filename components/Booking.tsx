"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, MessageSquareText, Phone } from "lucide-react";
import { hours, services, shop, formatTime } from "@/lib/shop";
import { useShopNow, type ShopNow } from "@/lib/useShopClock";

type Day = { key: string; weekday: string; label: string; dow: number; isToday: boolean };

function upcomingDays(now: ShopNow, count = 10): Day[] {
  const days: Day[] = [];
  for (let i = 0; days.length < count && i < 21; i++) {
    const d = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
    const dow = d.getUTCDay();
    const h = hours[dow];
    if (!h) continue;
    // Skip today if there's no bookable slot left.
    if (i === 0 && now.minutes > h.close * 60 - 60) continue;
    days.push({
      key: d.toISOString().slice(0, 10),
      dow,
      isToday: i === 0,
      weekday: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "short" }),
      label: d.toLocaleDateString("en-US", { timeZone: "UTC", month: "short", day: "numeric" }),
    });
  }
  return days;
}

function slotsFor(day: Day | undefined, now: ShopNow | null) {
  if (!day) return [];
  const h = hours[day.dow];
  if (!h) return [];
  const out: number[] = [];
  for (let t = h.open * 60; t <= h.close * 60 - 30; t += 30) {
    if (day.isToday && now && t < now.minutes + 45) continue;
    out.push(t);
  }
  return out;
}

const chip =
  "rounded-full border px-4 py-2.5 text-[0.95rem] font-medium transition-colors focus-visible:outline-offset-2";
const chipOn = "border-chrome bg-chrome text-ink";
const chipOff = "border-line text-chrome hover:border-steel";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "sms"; message: string }
  | { kind: "error"; message: string };

export function Booking() {
  const now = useShopNow();
  const days = useMemo(() => (now ? upcomingDays(now) : []), [now]);

  const [serviceId, setServiceId] = useState(services[1].id);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const day = days.find((d) => d.key === dayKey) ?? days[0];
  const slots = useMemo(() => slotsFor(day, now), [day, now]);
  const service = services.find((s) => s.id === serviceId)!;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const barber = String(fd.get("barber") ?? "").trim();
    const notes = String(fd.get("notes") ?? "").trim();

    if (!day || time === null) {
      setStatus({ kind: "error", message: "Pick a day and a time to send your request." });
      return;
    }
    if (!name || phone.replace(/\D/g, "").length < 10) {
      setStatus({ kind: "error", message: "Add your name and a 10-digit mobile number so the shop can text you back." });
      return;
    }

    const when = `${day.weekday === "Today" || day.weekday === "Tomorrow" ? `${day.weekday}, ` : ""}${new Date(
      `${day.key}T12:00:00Z`,
    ).toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "short", day: "numeric" })} at ${formatTime(time)}`;

    setStatus({ kind: "sending" });
    // The confirmation is shorter than the form; bring it into view.
    const reveal = () =>
      setTimeout(() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }), 50);

    const message = [
      `Hi Chop Shop! I'd like to book a ${service.name.toLowerCase()}${barber ? ` with ${barber}` : ""}.`,
      `When: ${when}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          barber,
          notes,
          service: service.name,
          when,
          company: fd.get("company"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        reveal();
        return;
      }
      if (data.fallback === "sms") {
        setStatus({ kind: "sms", message });
        reveal();
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = `sms:${shop.phoneE164}?&body=${encodeURIComponent(message)}`;
        }
        return;
      }
      setStatus({ kind: "error", message: data.error ?? "The request didn't go through. Call the shop instead." });
    } catch {
      setStatus({ kind: "sms", message });
      reveal();
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status.kind === "sent" || status.kind === "sms" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[520px] flex-col justify-center"
            role="status"
          >
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-chrome text-ink">
              {status.kind === "sent" ? <Check className="size-7" /> : <MessageSquareText className="size-7" />}
            </span>
            {status.kind === "sent" ? (
              <>
                <h3 className="chrome mt-6 font-display text-5xl leading-[0.9] font-black">Request sent</h3>
                <p className="mt-4 max-w-md text-lg text-steel">
                  The shop got your request and will text you back to confirm the time. Need it sooner? Call{" "}
                  <a className="text-chrome underline underline-offset-4" href={`tel:${shop.phoneE164}`}>
                    {shop.phoneDisplay}
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <h3 className="chrome mt-6 font-display text-5xl leading-[0.9] font-black">Send it as a text</h3>
                <p className="mt-4 max-w-md text-lg text-steel">
                  On your phone, your texting app opens with this message to {shop.phoneDisplay}. Hit send and the
                  shop will text you back to confirm. On a computer, copy it and text it from your phone.
                </p>
                <pre className="mt-6 max-w-md rounded-lg border border-line bg-ink p-4 font-sans text-[0.95rem] whitespace-pre-wrap text-chrome">
                  {status.message}
                </pre>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`sms:${shop.phoneE164}?&body=${encodeURIComponent(status.message)}`}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-chrome px-6 font-semibold text-ink"
                  >
                    <MessageSquareText className="size-5" /> Open texting app
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(status.message);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-semibold text-chrome hover:border-steel"
                  >
                    {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                    {copied ? "Copied" : "Copy message"}
                  </button>
                </div>
              </>
            )}
            <button
              type="button"
              onClick={() => setStatus({ kind: "idle" })}
              className="mt-8 self-start text-sm font-medium text-steel underline underline-offset-4 hover:text-chrome"
            >
              Book another chair
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-9"
          >
            <fieldset className="min-w-0">
              <legend className="font-display text-2xl font-bold text-chrome">Service</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => (
                  <label key={s.id} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={serviceId === s.id}
                      onChange={() => setServiceId(s.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={`${chip} inline-flex gap-2 peer-focus-visible:outline-2 peer-focus-visible:outline-chrome ${
                        serviceId === s.id ? chipOn : chipOff
                      }`}
                    >
                      {s.name}
                      <span className={serviceId === s.id ? "text-ink/60" : "text-steel"}>{s.price}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="font-display text-2xl font-bold text-chrome">Day</legend>
              <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
                {now === null
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} className="h-[68px] w-[84px] shrink-0 animate-pulse rounded-xl bg-gunmetal" />
                    ))
                  : days.map((d) => {
                      const on = d.key === day?.key;
                      return (
                        <label key={d.key} className="relative shrink-0 cursor-pointer">
                          <input
                            type="radio"
                            name="day"
                            value={d.key}
                            checked={on}
                            onChange={() => {
                              setDayKey(d.key);
                              setTime(null);
                            }}
                            className="peer sr-only"
                          />
                          <span
                            className={`flex w-[84px] flex-col items-center rounded-xl border py-3 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-chrome ${
                              on ? chipOn : chipOff
                            }`}
                          >
                            <span className={`text-sm ${on ? "text-ink/70" : "text-steel"}`}>{d.weekday}</span>
                            <span className="font-display text-xl font-bold">{d.label}</span>
                          </span>
                        </label>
                      );
                    })}
              </div>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="font-display text-2xl font-bold text-chrome">Time</legend>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {now === null
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <span key={i} className="h-11 animate-pulse rounded-full bg-gunmetal" />
                    ))
                  : slots.map((t) => (
                      <label key={t} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name="time"
                          value={t}
                          checked={time === t}
                          onChange={() => setTime(t)}
                          className="peer sr-only"
                        />
                        <span
                          className={`${chip} block text-center tabular-nums peer-focus-visible:outline-2 peer-focus-visible:outline-chrome ${
                            time === t ? chipOn : chipOff
                          }`}
                        >
                          {formatTime(t)}
                        </span>
                      </label>
                    ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" autoComplete="name" required />
              <Field label="Mobile number" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(915) 555-0123" required />
              <Field label="Barber" name="barber" placeholder="Any barber" hint="Optional" />
              <Field label="Anything we should know?" name="notes" placeholder="Photo on my phone, low taper…" hint="Optional" />
            </div>
            {/* Honeypot for bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
              <label>
                Company <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status.kind === "error" && (
              <p role="alert" className="rounded-lg border border-pole-red/50 bg-pole-red/10 px-4 py-3 text-chrome">
                {status.message}
              </p>
            )}

            <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-sm text-steel">
                This sends a request, not a confirmed booking. The shop texts you back to lock in the time.
              </p>
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="group relative inline-flex h-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-chrome px-9 text-lg font-semibold text-ink disabled:opacity-60"
              >
                <span className="relative z-10">{status.kind === "sending" ? "Sending…" : "Send request"}</span>
                <span
                  aria-hidden
                  className="pole absolute inset-x-0 bottom-0 h-1 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
                />
              </button>
            </div>
            <p className="text-sm text-steel">
              Rather talk to someone?{" "}
              <a href={`tel:${shop.phoneE164}`} className="inline-flex items-center gap-1 text-chrome underline underline-offset-4">
                <Phone className="size-3.5" aria-hidden /> Call {shop.phoneDisplay}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  hint,
  ...props
}: { label: string; name: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-[0.95rem] font-medium text-chrome">
        {label}
        {hint ? <span className="text-sm font-normal text-steel">{hint}</span> : null}
      </span>
      <input
        name={name}
        className="mt-2 h-12 w-full rounded-lg border border-line bg-ink px-4 text-chrome placeholder:text-steel/60 focus:border-chrome focus:outline-none"
        {...props}
      />
    </label>
  );
}

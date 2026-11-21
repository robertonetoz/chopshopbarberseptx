import { NextResponse } from "next/server";

/**
 * Booking requests.
 *
 * If Twilio credentials are set (see .env.example), the request is texted
 * straight to the shop's phone. Without them the route answers 503 with
 * `fallback: "sms"`, and the browser opens the visitor's own texting app
 * with the request already written out.
 */

type Body = {
  name?: string;
  phone?: string;
  service?: string;
  barber?: string;
  when?: string;
  notes?: string;
  company?: string; // honeypot
};

const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f]+/g, " ").trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 20).replace(/[^\d+]/g, "");
  const service = clean(body.service, 80);
  const when = clean(body.when, 80);
  const barber = clean(body.barber, 60) || "Any barber";
  const notes = clean(body.notes, 300);

  if (!name || phone.replace(/\D/g, "").length < 10 || !service || !when) {
    return NextResponse.json(
      { ok: false, error: "Add your name, a 10-digit phone number, a service and a time." },
      { status: 422 },
    );
  }

  const text = [
    "New booking request (website)",
    `${name}, ${phone}`,
    `${service} with ${barber}`,
    when,
    notes ? `Notes: ${notes}` : "",
    "Text or call them back to confirm.",
  ]
    .filter(Boolean)
    .join("\n");

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.SHOP_SMS_TO;

  if (!sid || !token || !from || !to) {
    return NextResponse.json({ ok: false, fallback: "sms" }, { status: 503 });
  }

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ From: from, To: to, Body: text }),
  });

  if (!res.ok) {
    console.error("Twilio error", res.status, await res.text());
    return NextResponse.json({ ok: false, fallback: "sms" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}

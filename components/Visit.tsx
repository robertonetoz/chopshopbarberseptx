"use client";

import { Navigation, Phone } from "lucide-react";
import { dayNames, formatHour, hours, shop } from "@/lib/shop";
import { useShopNow } from "@/lib/useShopClock";
import { Booking } from "./Booking";

// Week starts Monday on the hours card.
const order = [1, 2, 3, 4, 5, 6, 0];

export function Visit() {
  const now = useShopNow();

  return (
    <section aria-labelledby="book-title" id="book" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="min-w-0 lg:col-span-7">
          <h2
            id="book-title"
            className="chrome font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.86] font-black tracking-[-0.01em]"
          >
            Book a chair
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel">
            Pick a service and a time. Your request goes to the shop by text, and they text you back to confirm.
          </p>
          <div className="mt-12">
            <Booking />
          </div>
        </div>

        <aside id="visit" aria-label="Hours and location" className="min-w-0 lg:col-span-5">
          <div className="brushed overflow-hidden rounded-xl border border-line lg:sticky lg:top-24">
            <div aria-hidden className="pole h-2" />
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-3xl font-extrabold text-chrome">Hours</h3>
              <table className="mt-5 w-full text-[1.02rem]">
                <caption className="sr-only">Opening hours, Mountain Time</caption>
                <tbody>
                  {order.map((i) => {
                    const h = hours[i];
                    const today = now?.day === i;
                    return (
                      <tr key={i} className={`border-b border-line/70 last:border-0 ${today ? "text-chrome" : "text-steel"}`}>
                        <th scope="row" className="py-2.5 text-left font-medium">
                          {dayNames[i]}
                          {today ? (
                            <span className="ml-2 rounded-full bg-chrome px-2 py-0.5 text-xs font-semibold text-ink">
                              Today
                            </span>
                          ) : null}
                        </th>
                        <td className="py-2.5 text-right tabular-nums">
                          {h ? `${formatHour(h.open)} – ${formatHour(h.close)}` : "Closed"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-3 text-sm text-steel">Holiday hours may differ. Call ahead on holidays.</p>

              <h3 className="mt-10 font-display text-3xl font-extrabold text-chrome">Find us</h3>
              <address className="mt-3 text-lg leading-relaxed text-chrome not-italic">
                {shop.address.street}
                <br />
                {shop.address.city}, {shop.address.region} {shop.address.zip}
              </address>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={shop.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-chrome px-5 font-semibold text-ink"
                >
                  <Navigation className="size-4" aria-hidden /> Directions
                </a>
                <a
                  href={`tel:${shop.phoneE164}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-semibold text-chrome hover:border-steel"
                >
                  <Phone className="size-4" aria-hidden /> {shop.phoneDisplay}
                </a>
              </div>
            </div>
            <iframe
              title="Map to Chop Shop Barbers"
              src={shop.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-72 w-full border-0 border-t border-line [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

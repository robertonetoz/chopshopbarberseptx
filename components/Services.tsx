import { services } from "@/lib/shop";
import { SectionHead } from "./SectionHead";

export function Services() {
  return (
    <section aria-labelledby="menu-title" id="menu" className="relative py-20 sm:py-28">
      <SectionHead id="menu-title" title="The service menu">
        Clean fades to full shaves, for every age. Longer hair or detailed styles can run a little more,
        and your barber will tell you before they start.
      </SectionHead>

      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* The board */}
        <div className="brushed relative overflow-hidden rounded-xl border border-line">
          <div aria-hidden className="pole h-2 w-full" />
          <ul className="grid md:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={`flex flex-col gap-2 border-line px-5 py-6 sm:px-8 sm:py-7 ${
                  i < services.length - 1 ? "border-b" : ""
                } ${i % 2 === 0 ? "md:border-r" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-[1.75rem] leading-none font-extrabold text-chrome sm:text-3xl">
                    {s.name}
                  </h3>
                  <span aria-hidden className="leader h-2 min-w-6 flex-1" />
                  <span className="font-display text-[1.75rem] leading-none font-extrabold text-chrome tabular-nums sm:text-3xl">
                    {s.price}
                  </span>
                </div>
                <p className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-[0.975rem] text-steel">
                  <span className="max-w-sm">{s.detail}</span>
                  <span className="shrink-0 tabular-nums">About {s.minutes} min</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5 text-sm text-steel">
          Prices are a starting point. Call{" "}
          <a href="tel:+19152571446" className="text-chrome underline underline-offset-4">
            (915) 257-1446
          </a>{" "}
          if you want a quote for something specific.
        </p>
      </div>
    </section>
  );
}

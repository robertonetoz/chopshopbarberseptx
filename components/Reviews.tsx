import { reviews, shop } from "@/lib/shop";
import { Stars } from "./icons";

export function Reviews() {
  const [feature, ...rest] = reviews;
  return (
    <section aria-labelledby="reviews-title" id="reviews" className="relative border-y border-line bg-asphalt py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="reviews-title" className="font-display leading-[0.86] font-black">
            <span className="chrome block text-[clamp(6rem,16vw,12rem)] tabular-nums">{shop.rating}</span>
            <span className="mt-2 block text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none text-chrome">
              from {shop.reviewCount} Google reviews
            </span>
          </h2>
          <a
            href={shop.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center self-start rounded-full border border-line px-6 font-semibold text-chrome transition-colors hover:border-steel lg:self-end"
          >
            Read them on Google
          </a>
        </div>

        <figure className="mt-16 grid gap-6 border-t border-line pt-10 lg:grid-cols-12">
          <Stars className="text-xl text-chrome lg:col-span-12" />
          <blockquote className="font-display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.08] font-semibold text-chrome lg:col-span-9">
            “{feature.text}”
          </blockquote>
          <figcaption className="text-steel lg:col-span-3 lg:self-end lg:text-right">
            <span className="block font-semibold text-chrome">{feature.name}</span>
            {feature.barber ? <>Cut by {feature.barber}, </> : null}
            {feature.when}
          </figcaption>
        </figure>

        <ul className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {rest.map((r) => (
            <li key={r.name} className="mb-6 break-inside-avoid rounded-lg border border-line bg-ink/60 p-6">
              <Stars className="text-sm text-chrome" />
              <p className="mt-4 leading-relaxed text-chrome/90">“{r.text}”</p>
              <p className="mt-5 text-sm text-steel">
                <span className="font-semibold text-chrome">{r.name}</span>
                {r.barber ? <> on {r.barber}</> : null}, {r.when}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { shop, work, type WorkItem } from "@/lib/shop";
import { InstagramIcon } from "./icons";
import { SectionHead } from "./SectionHead";

export function Work() {
  const rail = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<WorkItem | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="work-title" id="work" className="relative py-20 sm:py-28">
      <SectionHead id="work-title" title="Fresh off the chair">
        Real cuts from our barbers, straight from Instagram. Tap any one to watch the reel.
      </SectionHead>

      <div className="relative mt-14">
        <ul
          ref={rail}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-4 rail-pad"
        >
          {work.map((item, i) => (
            <li key={item.code} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block h-[440px] overflow-hidden rounded-lg bg-gunmetal text-left sm:h-[520px]"
                style={{ aspectRatio: item.ratio === "1/1" ? "4/5" : item.ratio }}
                aria-label={`${item.kind === "reel" ? "Watch" : "View"}: ${item.style}, by @${item.credit}`}
              >
                <Image
                  src={`/work/${item.code}.jpg`}
                  alt=""
                  fill
                  sizes="300px"
                  priority={i < 3}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                {item.kind === "reel" && (
                  <span className="absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-ink/60 text-chrome backdrop-blur transition-colors group-hover:bg-chrome group-hover:text-ink">
                    <Play className="ml-0.5 size-4 fill-current" aria-hidden />
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-2xl leading-none font-bold text-chrome">{item.style}</p>
                  <p className="mt-1.5 text-sm text-steel">@{item.credit}</p>
                </div>
              </button>
            </li>
          ))}
          <li className="shrink-0 snap-start">
            <a
              href={shop.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="brushed flex h-[440px] w-[247px] flex-col justify-between rounded-lg border border-line p-6 transition-colors hover:border-steel sm:h-[520px] sm:w-[292px]"
            >
              <InstagramIcon className="size-8 text-chrome" />
              <span>
                <span className="chrome block font-display text-4xl leading-[0.9] font-black">
                  More cuts on Instagram
                </span>
                <span className="mt-3 block text-steel">@{shop.instagram}</span>
              </span>
            </a>
          </li>
        </ul>

        <div className="mx-auto mt-6 flex max-w-7xl justify-end gap-2 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={edges.start}
            className="inline-flex size-12 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-steel disabled:opacity-30"
            aria-label="Previous cuts"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={edges.end}
            className="inline-flex size-12 items-center justify-center rounded-full border border-line text-chrome transition-colors hover:border-steel disabled:opacity-30"
            aria-label="More cuts"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <WorkViewer item={active} onClose={() => setActive(null)} />
    </section>
  );
}

function WorkViewer({ item, onClose }: { item: WorkItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.style}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-full w-full max-w-[420px] flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl leading-none font-bold">{item.style}</p>
                <a
                  href={`https://www.instagram.com/${item.credit}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-sm text-steel hover:text-chrome"
                >
                  @{item.credit}
                </a>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-chrome hover:border-steel"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <EmbedFrame key={item.code} item={item} />
            <a
              href={`https://www.instagram.com/p/${item.code}/`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 self-start text-sm font-medium text-steel hover:text-chrome"
            >
              <InstagramIcon className="size-4" /> Open on Instagram
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Instagram's player, with the cover shown underneath until it loads. */
function EmbedFrame({ item }: { item: WorkItem }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-[min(72svh,640px)] overflow-hidden rounded-lg bg-gunmetal">
      <Image
        src={`/work/${item.code}.jpg`}
        alt=""
        fill
        sizes="420px"
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-0" : "opacity-60 blur-sm"}`}
      />
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center" role="status">
          <span className="size-10 animate-spin rounded-full border-2 border-chrome/20 border-t-chrome" />
          <span className="sr-only">Loading the reel</span>
        </span>
      )}
      <iframe
        title={`${item.style} on Instagram`}
        src={`https://www.instagram.com/p/${item.code}/embed/`}
        onLoad={() => setLoaded(true)}
        className={`relative block h-full w-full bg-white transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    </div>
  );
}

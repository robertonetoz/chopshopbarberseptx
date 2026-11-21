"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { shop } from "@/lib/shop";
import { useShopNow, getStatus } from "@/lib/useShopClock";
import { Stars } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const now = useShopNow();
  const status = now ? getStatus(now) : null;

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Dark showroom: one overhead light on the sign, nothing else */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_50%_-8%,rgb(232_235_239/0.13),rgb(232_235_239/0.04)_45%,transparent_75%)]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        />
        {/* Light cone edges */}
        <div className="absolute inset-x-0 top-0 h-full bg-[conic-gradient(from_180deg_at_50%_-10%,transparent_0deg,transparent_160deg,rgb(255_255_255/0.035)_172deg,transparent_180deg,rgb(255_255_255/0.035)_188deg,transparent_200deg,transparent_360deg)]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pt-24 pb-10 text-center sm:px-6">
        <motion.h1 {...rise(0.15)} className="relative w-full max-w-[min(820px,92vw,max(280px,calc((100svh-570px)*1.75)))]">
          <span className="sr-only">Chop Shop Barbers, El Paso</span>
          {/* Soft shadow pool behind the sign */}
          <span
            aria-hidden
            className="absolute -inset-[6%] bg-[radial-gradient(closest-side,rgb(5_5_6/0.75),transparent)]"
          />
          <Image
            src="/images/logo-chrome.png"
            alt=""
            width={1200}
            height={685}
            priority
            sizes="(max-width: 900px) 92vw, 820px"
            className="relative h-auto w-full"
          />
          <span aria-hidden className="glint absolute inset-0" />
          {/* Polished floor: a faint mirror of the sign that fades out */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-full block"
            style={{
              opacity: 0.14,
              maskImage: "linear-gradient(180deg, #000 0%, transparent 26%)",
              WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 26%)",
            }}
          >
            <Image
              src="/images/logo-chrome.png"
              alt=""
              width={1200}
              height={685}
              sizes="(max-width: 900px) 92vw, 820px"
              className="h-auto w-full -scale-y-100"
            />
          </span>
          <span
            aria-hidden
            className="absolute inset-x-[-15%] top-full block h-px bg-[linear-gradient(90deg,transparent,rgb(232_235_239/0.35),transparent)]"
          />
        </motion.h1>

        <motion.p
          {...rise(0.5)}
          className="chrome relative mt-10 font-display text-[clamp(2rem,6vw,4.25rem)] leading-[0.95] font-extrabold tracking-tight sm:mt-12"
        >
          We keep El Paso looking sharp
        </motion.p>

        <motion.p {...rise(0.62)} className="mt-5 max-w-xl text-lg leading-relaxed text-steel sm:text-xl">
          Fades, tapers, kids cuts and hot towel shaves on North Zaragoza Road. Walk-ins welcome,
          appointments recommended.
        </motion.p>

        <motion.div {...rise(0.74)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#book"
            className="group relative inline-flex h-14 items-center overflow-hidden rounded-full bg-chrome px-8 text-lg font-semibold text-ink"
          >
            <span className="relative z-10">Book a chair</span>
            <span
              aria-hidden
              className="pole absolute inset-x-0 bottom-0 h-1 translate-y-full transition-transform duration-300 group-hover:translate-y-0"
            />
          </a>
          <a
            href={`tel:${shop.phoneE164}`}
            className="inline-flex h-14 items-center gap-2.5 rounded-full border border-line bg-ink/40 px-7 text-lg font-semibold text-chrome backdrop-blur transition-colors hover:border-steel"
          >
            <Phone className="size-5" aria-hidden />
            Call {shop.phoneDisplay}
          </a>
        </motion.div>
      </div>

      {/* Info rail */}
      <motion.div
        {...rise(0.9)}
        className="border-t border-line/70 bg-ink/60 backdrop-blur-sm"
      >
        <dl className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          <div className="border-r border-b border-line/70 px-4 py-5 sm:px-8 lg:border-b-0">
            <dt className="text-sm text-steel">Google rating</dt>
            <dd className="mt-1 flex items-center gap-2 font-display text-2xl font-bold">
              {shop.rating}
              <Stars className="text-[0.8rem] text-chrome" />
              <span className="font-sans text-sm font-medium text-steel">{shop.reviewCount} reviews</span>
            </dd>
          </div>
          <div className="border-b border-line/70 px-4 py-5 sm:px-8 lg:border-r lg:border-b-0">
            <dt className="text-sm text-steel">Right now</dt>
            <dd className="mt-1 flex min-h-8 items-center gap-2.5 font-display text-xl font-bold sm:text-2xl">
              {status ? (
                <>
                  <span
                    aria-hidden
                    className={`size-2.5 shrink-0 rounded-full ${
                      status.open ? "bg-signal shadow-[0_0_12px_var(--color-signal)]" : "bg-pole-red"
                    }`}
                  />
                  <span className="leading-tight">{status.label}</span>
                </>
              ) : (
                <span className="text-steel">Mon–Sat</span>
              )}
            </dd>
          </div>
          <div className="border-r border-line/70 px-4 py-5 sm:px-8">
            <dt className="text-sm text-steel">No appointment?</dt>
            <dd className="mt-1 font-display text-xl font-bold sm:text-2xl">Walk-ins welcome</dd>
          </div>
          <div className="px-4 py-5 sm:px-8">
            <dt className="text-sm text-steel">Find us</dt>
            <dd className="mt-1">
              <a
                href={shop.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-display text-xl font-bold underline-offset-4 hover:underline sm:text-2xl"
              >
                <MapPin className="size-5 shrink-0" aria-hidden />
                1610 N Zaragoza Rd
              </a>
            </dd>
          </div>
        </dl>
      </motion.div>
    </section>
  );
}

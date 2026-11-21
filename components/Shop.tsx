"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { SectionHead } from "./SectionHead";

const perks = [
  {
    title: "Walk in or book ahead",
    body: "Pull up whenever we’re open. Booking ahead gets you the chair at the time you want.",
  },
  {
    title: "Kids in the chair",
    body: "From first haircuts to teens with a picture on their phone. Patient barbers, no rushing.",
  },
  {
    title: "Water’s on us",
    body: "Complimentary water while you wait, TVs on the wall and a clean shop every day.",
  },
  {
    title: "Barbers who listen",
    body: "Bring a photo or just describe it. We get it right before the clippers come out.",
  },
];

export function Shop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const ySmall = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -90]);

  return (
    <section aria-labelledby="shop-title" id="shop" className="relative overflow-hidden py-20 sm:py-28">
      <SectionHead id="shop-title" title="Built like a garage">
        Mobil drums at the stations, hubcaps and road signs on the walls, and a long row of chrome
        chairs down the middle. A barbershop that feels like a hot-rod shop.
      </SectionHead>

      <div ref={ref} className="mx-auto mt-14 grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <motion.figure style={{ y: yBig }} className="relative overflow-hidden rounded-lg lg:col-span-8">
          <Image
            src="/images/shop-wall.jpg"
            alt="Row of black and chrome barber chairs under car posters, hubcaps and vintage signs"
            width={1700}
            height={1275}
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="h-full w-full object-cover brightness-[.85] saturate-[.75]"
          />
        </motion.figure>
        <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
          <motion.figure style={{ y: ySmall }} className="relative aspect-[3/4] overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
            <Image
              src="/images/shop-floor.jpg"
              alt="Long view of the shop floor with barbers at work"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover brightness-[.85] saturate-[.75]"
            />
          </motion.figure>
          <figure className="relative aspect-[3/4] overflow-hidden rounded-lg lg:hidden">
            <Image
              src="/images/shop-lounge.jpg"
              alt="Waiting area with the Chop Shop banner, a barber pole and a Texaco drum"
              fill
              sizes="50vw"
              className="object-cover brightness-[.85] saturate-[.75]"
            />
          </figure>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-4 sm:px-6 lg:mt-24 lg:grid-cols-12 lg:px-8">
        <figure className="relative hidden aspect-[3/4] overflow-hidden rounded-lg lg:col-span-4 lg:block">
          <Image
            src="/images/shop-lounge.jpg"
            alt="Waiting area with the Chop Shop banner, a barber pole and a Texaco drum"
            fill
            sizes="33vw"
            className="object-cover brightness-[.85] saturate-[.75]"
          />
        </figure>
        <div className="flex flex-col justify-center lg:col-span-7 lg:col-start-6">
          <blockquote className="font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] font-bold text-chrome">
            “The industrial-chic design, reminiscent of the iconic Chop Shop from Robots, creates a truly
            unique and memorable atmosphere.”
          </blockquote>
          <p className="mt-4 text-steel">Luz O., Google review</p>

          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {perks.map((p) => (
              <div key={p.title} className="border-t border-line pt-5">
                <dt className="font-display text-2xl font-bold text-chrome">{p.title}</dt>
                <dd className="mt-2 leading-relaxed text-steel">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

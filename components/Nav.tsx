"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { shop } from "@/lib/shop";
import { InstagramIcon } from "./icons";

const links = [
  { href: "#work", label: "Work" },
  { href: "#menu", label: "Menu" },
  { href: "#shop", label: "The shop" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setSolid(window.scrollY > 40);
    sync();
    return scrollY.on("change", sync);
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid || open
            ? "border-b border-line/80 bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* Scroll progress, drawn as a barber pole */}
        <motion.div
          aria-hidden
          className="pole absolute inset-x-0 top-0 h-[3px] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <a href="#top" className="shrink-0" aria-label="Chop Shop Barbers, back to top">
            <Image
              src="/images/logo-chrome-sm.png"
              alt=""
              width={480}
              height={274}
              priority
              className="h-9 w-auto lg:h-11"
            />
          </a>

          <ul className="hidden items-center gap-8 text-[0.95rem] font-medium text-steel md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-chrome">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${shop.phoneE164}`}
              className="hidden items-center gap-2 px-3 py-2 text-[0.95rem] font-semibold text-chrome lg:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              {shop.phoneDisplay}
            </a>
            <a
              href="#book"
              className="hidden rounded-full bg-chrome px-5 py-2.5 text-[0.95rem] font-semibold text-ink transition-transform hover:-translate-y-px sm:inline-flex"
            >
              Book a chair
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-full text-chrome md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-24 pb-10 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.concat({ href: "#book", label: "Book a chair" }).map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="chrome block py-2 font-display text-5xl font-extrabold"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-3 text-steel">
              <a href={`tel:${shop.phoneE164}`} className="flex items-center gap-3 text-lg text-chrome">
                <Phone className="size-5" aria-hidden /> {shop.phoneDisplay}
              </a>
              <a href={shop.instagramUrl} className="flex items-center gap-3 text-lg" target="_blank" rel="noreferrer">
                <InstagramIcon className="size-5" /> @{shop.instagram}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { shop } from "@/lib/shop";

/** Thumb-reach Call / Book bar on phones, shown once the hero is scrolled past. */
export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const book = document.getElementById("book");
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atBook = book ? book.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(pastHero && !atBook);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full border border-line bg-ink/85 p-1.5 backdrop-blur-md transition-all duration-300 sm:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={`tel:${shop.phoneE164}`}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full font-semibold text-chrome"
        tabIndex={show ? 0 : -1}
      >
        <Phone className="size-4" aria-hidden /> Call
      </a>
      <a
        href="#book"
        className="inline-flex h-12 items-center justify-center rounded-full bg-chrome font-semibold text-ink"
        tabIndex={show ? 0 : -1}
      >
        Book a chair
      </a>
    </div>
  );
}

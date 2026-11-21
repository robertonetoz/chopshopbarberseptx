"use client";

import { useSyncExternalStore } from "react";
import { hours, shop, formatHour, dayNames } from "./shop";

export type ShopNow = {
  day: number; // 0 = Sunday
  minutes: number; // minutes since midnight, shop local time
  y: number;
  m: number; // 1-12
  d: number;
};

/** Current date/time in El Paso, encoded as a stable string for the store. */
function readKey() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: shop.timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return [wd, +get("hour") * 60 + +get("minute"), get("year"), get("month"), get("day")].join("|");
}

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 30_000);
  return () => window.clearInterval(id);
}

/** Returns null during server render / first paint, then the live shop time. */
export function useShopNow(): ShopNow | null {
  const key = useSyncExternalStore(subscribe, readKey, () => null);
  if (!key) return null;
  const [day, minutes, y, m, d] = key.split("|").map(Number);
  return { day, minutes, y, m, d };
}

export type ShopStatus = { open: boolean; label: string };

export function getStatus(now: ShopNow): ShopStatus {
  const today = hours[now.day];
  if (today && now.minutes >= today.open * 60 && now.minutes < today.close * 60) {
    const left = today.close * 60 - now.minutes;
    return {
      open: true,
      label:
        left <= 60
          ? `Open now, closing soon at ${formatHour(today.close)}`
          : `Open now until ${formatHour(today.close)}`,
    };
  }
  if (today && now.minutes < today.open * 60) {
    return { open: false, label: `Closed now, opens today at ${formatHour(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const idx = (now.day + i) % 7;
    const h = hours[idx];
    if (h) {
      const when = i === 1 ? "tomorrow" : dayNames[idx];
      return { open: false, label: `Closed now, opens ${when} at ${formatHour(h.open)}` };
    }
  }
  return { open: false, label: "Closed" };
}

// Single source of truth for the shop's public info.
// Edit this file to update hours, prices, reviews or gallery items.

export const shop = {
  name: "Chop Shop Barbers",
  legalName: "Chop Shop Barbers LLC",
  tagline: "We keep El Paso looking sharp",
  phoneDisplay: "(915) 257-1446",
  phoneE164: "+19152571446",
  instagram: "chopshopbarberseptx",
  instagramUrl: "https://www.instagram.com/chopshopbarberseptx/",
  address: {
    street: "1610 N Zaragoza Rd, Suite C1",
    city: "El Paso",
    region: "TX",
    zip: "79936",
  },
  geo: { lat: 31.7439079, lng: -106.2849003 },
  mapsUrl: "https://share.google/xJ4GNQEYoRjkB5vFT",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Chop+Shop+Barbers+LLC,+1610+N+Zaragoza+Rd+C1,+El+Paso,+TX+79936",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Chop+Shop+Barbers+LLC,+1610+N+Zaragoza+Rd+C1,+El+Paso,+TX+79936&z=15&hl=en&output=embed",
  rating: 4.8,
  reviewCount: 186,
  timeZone: "America/Denver", // El Paso runs on Mountain Time
  year: 2026,
} as const;

/** Opening hours, 24h clock. Index 0 = Sunday (matches Date.getDay()). */
export type DayHours = { open: number; close: number } | null;
export const hours: DayHours[] = [
  null, // Sunday
  { open: 10, close: 20 }, // Monday
  { open: 10, close: 20 }, // Tuesday
  { open: 10, close: 20 }, // Wednesday
  { open: 10, close: 20 }, // Thursday
  { open: 9, close: 20 }, // Friday
  { open: 9, close: 18 }, // Saturday
];

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatHour(h: number) {
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr} ${suffix}`;
}

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${suffix}`;
}

// ⚠️ Prices are starting points based on the $20–30 range Google shows for
// this shop. Confirm every price with the owner before launch.
export type Service = {
  id: string;
  name: string;
  detail: string;
  price: string;
  minutes: number;
};

export const services: Service[] = [
  {
    id: "haircut",
    name: "Classic haircut",
    detail: "Scissor or clipper cut, styled and finished with a neck shave.",
    price: "$25",
    minutes: 30,
  },
  {
    id: "fade",
    name: "Skin fade",
    detail: "Low, mid, high, taper or burst. Blended down to the skin.",
    price: "$30",
    minutes: 45,
  },
  {
    id: "kids",
    name: "Kids cut",
    detail: "12 and under. First haircuts welcome, patience included.",
    price: "$20",
    minutes: 30,
  },
  {
    id: "cut-beard",
    name: "Cut + beard",
    detail: "Any haircut plus a shaped, lined and oiled beard.",
    price: "$40",
    minutes: 60,
  },
  {
    id: "beard",
    name: "Beard trim",
    detail: "Shape-up, razor line and hot towel.",
    price: "$15",
    minutes: 20,
  },
  {
    id: "lineup",
    name: "Line-up",
    detail: "Edge-up on the hairline, beard line and neck.",
    price: "$12",
    minutes: 15,
  },
  {
    id: "head-shave",
    name: "Head shave",
    detail: "Straight razor, hot towel, finished with aftershave balm.",
    price: "$25",
    minutes: 30,
  },
  {
    id: "hot-towel",
    name: "Hot towel shave",
    detail: "Straight-razor face shave with hot towels before and after.",
    price: "$25",
    minutes: 30,
  },
  {
    id: "design",
    name: "Hair design",
    detail: "Lines, parts and freestyle designs added to any cut.",
    price: "+$5",
    minutes: 15,
  },
];

export type WorkItem = {
  code: string; // Instagram shortcode
  kind: "reel" | "photo";
  style: string;
  credit: string; // Instagram handle of the barber or account that posted it
  ratio: "9/16" | "4/5" | "1/1";
};

export const work: WorkItem[] = [
  { code: "DMlY0aRBP64", kind: "reel", style: "Curly drop fade", credit: "drizy.flip", ratio: "9/16" },
  { code: "DNE7iFjMysY", kind: "reel", style: "Textured crop", credit: "bagchaser.cutzz_", ratio: "9/16" },
  { code: "DMY1OVRPpQd", kind: "reel", style: "Twists + taper", credit: "drizy.flip", ratio: "9/16" },
  { code: "DC-gz5YPrla", kind: "reel", style: "Bleached curls, burst fade", credit: "bagchaser.cutzz_", ratio: "9/16" },
  { code: "DL6PP7BpBnP", kind: "reel", style: "Taper + line-up", credit: "drizy.flip", ratio: "9/16" },
  { code: "DOLuThQEaiJ", kind: "reel", style: "Low taper", credit: "drizy.flip", ratio: "9/16" },
  { code: "DBHvG4APkYp", kind: "reel", style: "Curly taper with part", credit: "chopshopbarberseptx", ratio: "9/16" },
  { code: "DJCj2ZCvmH_", kind: "reel", style: "Mid fade, flow on top", credit: "gabr1elbravo", ratio: "9/16" },
  { code: "DA_vE6QPe3y", kind: "reel", style: "Top knot + taper", credit: "chopshopbarberseptx", ratio: "9/16" },
  { code: "CbZBrR9L7lf", kind: "photo", style: "Design lines", credit: "chopshopbarberseptx", ratio: "1/1" },
  { code: "DFGYPGFhm8-", kind: "photo", style: "Behind the chair", credit: "drizy.flip", ratio: "4/5" },
];

export type Review = {
  name: string;
  when: string;
  text: string;
  barber?: string;
};

export const reviews: Review[] = [
  {
    name: "Carla C.",
    when: "a year ago",
    barber: "Shamar",
    text: "After a heartbreaking experience at another place left my baby’s hair a mess, a friend recommended Shamar, and wow, he worked pure magic. He was patient, gentle, and didn’t make my 11-month-old shed a single tear. We’ve officially found our forever barber.",
  },
  {
    name: "Niko L.",
    when: "2 years ago",
    barber: "Esteban",
    text: "The staff are very professional and courteous. They greet you when you arrive and thank you when you leave. It’s hard to find barbers of Esteban’s caliber who are professional, consistent and don’t rush the haircut.",
  },
  {
    name: "Lorena R.",
    when: "2 years ago",
    text: "I have 5 boys at home and a husband, with styles from shoulder length to almost buzz cut. This shop has been able to accommodate each one of them. Definitely a family friendly barber. We’ll gladly stay here for good!",
  },
  {
    name: "Emilio M.",
    when: "a week ago",
    text: "Great place, great people, and great service. Came out looking fresh! Will definitely be back.",
  },
  {
    name: "Miguel Z.",
    when: "3 months ago",
    text: "Best experience I’ve had at a barbershop. The customer service was amazing.",
  },
  {
    name: "Sandra J.",
    when: "4 years ago",
    barber: "Joseph & Aaron",
    text: "Excellent service! Joseph and Aaron are super cordial and go above and beyond. Super professional, location is super clean and has amenities. Very recommended.",
  },
  {
    name: "Robert L.",
    when: "11 months ago",
    barber: "Shamar",
    text: "Shamar is great. My son and him are having a great conversation, and he is getting a great haircut!",
  },
];

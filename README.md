# Chop Shop Barbers — site

Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub and import into Vercel (zero config).

## Where things live

| What | File |
| --- | --- |
| Phone, address, hours, prices, reviews, gallery | `lib/shop.ts` |
| Colors, fonts, chrome text, barber-pole stripes | `app/globals.css` |
| Booking request endpoint (Twilio SMS) | `app/api/book/route.ts` |
| Photos and logo | `public/images/` |
| Instagram covers (named by post code) | `public/work/` |

## Booking requests

The form sends a **request**, and the shop texts the client back to confirm.

- **With Twilio** (recommended): copy `.env.example` to `.env.local` (or set the
  same variables in Vercel). Requests arrive as an SMS on `SHOP_SMS_TO`.
- **Without Twilio**: the form opens the visitor's own texting app with the
  request already written, addressed to (915) 257-1446.

## Adding a cut to the gallery

1. Save the post's cover as `public/work/<POST_CODE>.jpg` (the code is the part
   after `/p/` or `/reel/` in the Instagram link).
2. Add an entry to `work` in `lib/shop.ts`.

## Confirm with the owner before launch

- Prices and durations in `services` (current values are estimates).
- Barber names, if they want a team section.
- Final domain (update `metadataBase` in `app/layout.tsx`).

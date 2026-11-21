import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Barlow } from "next/font/google";
import { shop, hours, dayNames } from "@/lib/shop";
import "./globals.css";

const display = Big_Shoulders({
  adjustFontFallback: false,
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const sans = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Fades, tapers, kids cuts, beard trims and hot towel shaves on N Zaragoza Rd in East El Paso. Walk-ins welcome, appointments recommended. Call (915) 257-1446.";

export const metadata: Metadata = {
  metadataBase: new URL("https://chopshopbarberseptx.com"),
  title: "Chop Shop Barbers | Barbershop in East El Paso, TX",
  description,
  openGraph: {
    title: "Chop Shop Barbers | El Paso, TX",
    description,
    images: [{ url: "/images/shop-wall.jpg", width: 1700, height: 1275 }],
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#050506",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: shop.legalName,
  image: "/images/shop-wall.jpg",
  telephone: shop.phoneE164,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: shop.address.street,
    addressLocality: shop.address.city,
    addressRegion: shop.address.region,
    postalCode: shop.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: shop.geo.lat, longitude: shop.geo.lng },
  sameAs: [shop.instagramUrl],
  openingHoursSpecification: hours.flatMap((h, i) =>
    h
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: dayNames[i],
            opens: `${String(h.open).padStart(2, "0")}:00`,
            closes: `${String(h.close).padStart(2, "0")}:00`,
          },
        ]
      : [],
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

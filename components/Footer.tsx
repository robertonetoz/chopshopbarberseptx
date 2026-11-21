import Image from "next/image";
import { shop } from "@/lib/shop";
import { InstagramIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-asphalt pb-28 sm:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Image src="/images/logo-chrome-sm.png" alt="Chop Shop Barbers" width={480} height={274} className="h-20 w-auto" />
          <p className="mt-5 max-w-xs text-steel">{shop.tagline}. Trusted by over a thousand clients in East El Paso.</p>
        </div>
        <div className="text-steel">
          <p className="font-display text-xl font-bold text-chrome">Visit</p>
          <address className="mt-3 leading-relaxed not-italic">
            {shop.address.street}
            <br />
            {shop.address.city}, {shop.address.region} {shop.address.zip}
          </address>
          <a href={`tel:${shop.phoneE164}`} className="mt-3 block text-chrome hover:underline">
            {shop.phoneDisplay}
          </a>
        </div>
        <div className="text-steel">
          <p className="font-display text-xl font-bold text-chrome">Follow</p>
          <a
            href={shop.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-chrome hover:underline"
          >
            <InstagramIcon className="size-5" /> @{shop.instagram}
          </a>
          <p className="mt-3 leading-relaxed">Mon–Thu 10 AM – 8 PM</p>
          <p>Fri 9 AM – 8 PM, Sat 9 AM – 6 PM</p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-line px-4 pt-6 text-sm text-steel sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {shop.year} {shop.legalName}. All rights reserved.
        </p>
        <a href="#top" className="hover:text-chrome">
          Back to top
        </a>
      </div>
    </footer>
  );
}

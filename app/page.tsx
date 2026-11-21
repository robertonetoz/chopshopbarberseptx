import { MotionConfig } from "motion/react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { Shop } from "@/components/Shop";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Shop />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  );
}

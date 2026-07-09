import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { FlyThrough } from "@/components/FlyThrough";
import { WhyMedia } from "@/components/home/WhyMedia";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: { absolute: "Hunter Espaniola · Real Estate Media, Southern Utah" },
  description:
    "Cinematic aerial films and stills for St. George and Washington County listings. FAA Part 107 certified drone pilot. Starting at $500 per property.",
};

export default function HomePage() {
  return (
    <>
      <Nav overlay />
      <main id="main">
        <FlyThrough />
        <TrustBar />
        <WhyMedia />
        <FeaturedWork />
        <HowItWorks />
        <PricingTeaser />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

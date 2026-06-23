import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { StickyAgendarButton } from "@/components/layout/StickyAgendarButton";
import { Hero } from "@/components/sections/Hero";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { MidPageCta } from "@/components/sections/MidPageCta";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LocationSection } from "@/components/sections/LocationSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-14 md:pb-0">
        <Hero />
        <BeforeAfterSection />
        <MidPageCta />
        <ServicesSection />
        <ProductShowcase />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppFAB />
      <StickyAgendarButton />
    </>
  );
}

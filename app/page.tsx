import LandingHero from "./components/landing/LandingHero";
import FeatureSection from "./components/landing/FeatureSection";
import ComparisonTable from "./components/landing/ComparisonTable";
import StarRating from "./components/landing/StarRating";
import StatsBar from "./components/landing/StatsBar";
import Testimonials from "./components/landing/Testimonials";
import HowItWorks from "./components/landing/HowItWorks";
import WhyWorth from "./components/landing/WhyWorth";
import Marquee from "./components/layout/Marquee";
import PillMarquee from "./components/layout/PillMarquee";
import Hero from "./components/hero/Hero";

const MARQUEE = [
  "NFC + QR",
  "Bez aplikacji",
  "iPhone i Android",
  "Wysyłka następnego dnia",
  "Więcej opinii w Google",
  "Wyprodukowano w PL",
];

export default function Home() {
  return (
    <main>
      <LandingHero />
      <Marquee items={MARQUEE} />
      <StatsBar />
      <ComparisonTable />
      <StarRating />

      {/* Animacja produktowa */}
      <div id="jak-to-dziala">
        <Hero />
      </div>

      {/* Sekcja "Jedna wizytówka. Więcej opinii." — pod animacją */}
      <FeatureSection />

      <HowItWorks />
      <Testimonials />
      <PillMarquee />
      <WhyWorth />
    </main>
  );
}

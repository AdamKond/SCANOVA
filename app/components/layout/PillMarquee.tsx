import {
  Star,
  MapPin,
  ShieldCheck,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Item = { Icon: LucideIcon; label: string; accent?: boolean };

const ITEMS: Item[] = [
  { Icon: Star, label: "Więcej opinii Google", accent: true },
  { Icon: MapPin, label: "Wyższa pozycja w Mapach" },
  { Icon: ShieldCheck, label: "Zaufanie klientów" },
  { Icon: Smartphone, label: "Bez aplikacji" },
  { Icon: Zap, label: "Szybka konfiguracja" },
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden>
      {ITEMS.map(({ Icon, label, accent }, i) => (
        <span
          key={i}
          className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm"
        >
          <Icon
            className={`h-4 w-4 ${accent ? "fill-amber-400 text-amber-500" : "text-blue-600"}`}
          />
          {label}
        </span>
      ))}
    </div>
  );
}

/** Przewijany pasek pigułek z ikonami (dwa identyczne tory → płynna pętla). */
export default function PillMarquee() {
  return (
    <section className="bg-blue-600 py-6">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
        Co zyskujesz
      </p>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}

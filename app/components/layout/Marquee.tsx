import { Check } from "lucide-react";

type Props = {
  items: string[];
};

function Track({ items }: Props) {
  return (
    <div
      className="flex min-w-full shrink-0 items-center justify-around"
      aria-hidden
    >
      {items.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-2 whitespace-nowrap px-6 text-sm font-semibold uppercase tracking-wide"
        >
          <Check className="h-4 w-4" />
          {t}
        </span>
      ))}
    </div>
  );
}

/** Dolny przewijany pasek plakietek (dwa identyczne tory + animacja -50%). */
export default function Marquee({ items }: Props) {
  return (
    <div className="overflow-hidden bg-blue-600 py-3 text-white">
      <div className="flex w-max animate-marquee">
        <Track items={items} />
        <Track items={items} />
      </div>
    </div>
  );
}

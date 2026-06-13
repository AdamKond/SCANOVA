import { Star } from "lucide-react";

type Props = {
  value: number;
  count: number;
};

/** Gwiazdki + "Ocena 4.9 (212)" + plakietka zadowolonych klientów. */
export default function RatingStars({ value, count }: Props) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < full ? "h-4 w-4 fill-amber-400 text-amber-400" : "h-4 w-4 text-zinc-300"
            }
          />
        ))}
      </div>
      <span className="font-semibold text-zinc-900">
        Ocena {value.toLocaleString("pl-PL")}
      </span>
      <span className="text-zinc-500">({count})</span>
      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
        Zadowoleni klienci
      </span>
    </div>
  );
}

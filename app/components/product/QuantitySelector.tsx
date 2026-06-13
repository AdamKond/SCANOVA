"use client";

import { computePricing, formatPrice, type Format, type QuantityTier } from "@/app/data/products";

type Props = {
  format: Format;
  quantities: QuantityTier[];
  selectedQty: number;
  onSelect: (qty: number) => void;
};

/** Wybór ilości: karty z ceną, ceną przekreśloną i plakietką "Najpopularniejsze". */
export default function QuantitySelector({ format, quantities, selectedQty, onSelect }: Props) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-zinc-900">Ilość</legend>
      <div className="grid grid-cols-3 gap-2.5">
        {quantities.map((tier) => {
          const active = tier.qty === selectedQty;
          const { price, compareAt, savePct } = computePricing(format, tier);
          return (
            <button
              key={tier.qty}
              type="button"
              onClick={() => onSelect(tier.qty)}
              aria-pressed={active}
              className={`relative flex flex-col items-center rounded-2xl border-2 pb-3 text-center transition ${
                active ? "border-blue-600 bg-blue-50" : "border-zinc-200 bg-white hover:border-zinc-300"
              } ${tier.badge ? "pt-7" : "pt-3"}`}
            >
              {tier.badge && (
                <span className="absolute inset-x-0 top-0 rounded-t-xl bg-blue-600 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {tier.badge}
                </span>
              )}
              <span className="text-base font-bold text-zinc-900">{tier.label}</span>
              <span className="mt-0.5 text-[11px] font-medium text-zinc-500">
                {savePct > 0 ? `Oszczędzasz ${savePct}%` : "Cena standardowa"}
              </span>
              <span className="mt-1.5 text-sm font-bold text-zinc-900">{formatPrice(price)}</span>
              {savePct > 0 && (
                <span className="text-xs text-zinc-400 line-through">{formatPrice(compareAt)}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { Format } from "@/app/data/products";

type Props = {
  formats: Format[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Wybór formatu: klikalne karty z miniaturą, nazwą i krótkim opisem. */
export default function FormatSelector({ formats, selectedId, onSelect }: Props) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-zinc-900">Format</legend>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {formats.map((f) => {
          const active = f.id === selectedId;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onSelect(f.id)}
              aria-pressed={active}
              className={`relative flex flex-col items-center gap-1.5 rounded-2xl border-2 p-2.5 text-center transition ${
                active
                  ? "border-blue-600 bg-blue-50"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              {active && (
                <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <span className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50">
                <Image
                  src={f.gallery[0].src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain p-1.5"
                />
              </span>
              <span className="text-sm font-semibold leading-tight text-zinc-900">{f.label}</span>
              <span className="text-[11px] leading-tight text-zinc-500">{f.blurb}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { AccordionItem } from "@/app/data/products";

type Props = {
  items: AccordionItem[];
};

/** Lista rozwijanych bloków (Opis / Szczegóły / Co w zestawie). */
export default function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-zinc-200 border-y border-zinc-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left text-[15px] font-semibold text-zinc-900"
            >
              {item.title}
              {isOpen ? (
                <Minus className="h-4 w-4 text-zinc-500" />
              ) : (
                <Plus className="h-4 w-4 text-zinc-500" />
              )}
            </button>
            {isOpen && (
              <p className="pb-4 text-sm leading-relaxed text-zinc-600">{item.body}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

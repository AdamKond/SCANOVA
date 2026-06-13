"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/app/data/products";

type Props = {
  images: GalleryImage[];
};

/** Główne zdjęcie + pasek miniatur + strzałki. Reset indeksu przy zmianie
 *  formatu robi rodzic przez key={format.id}. */
export default function ProductGallery({ images }: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const go = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-100">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-contain p-6"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Następne zdjęcie"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Pokaż zdjęcie ${i + 1}`}
              aria-current={i === index}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-50 ring-1 transition sm:w-20 ${
                i === index ? "ring-2 ring-blue-600" : "ring-zinc-200 hover:ring-zinc-300"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";

type IndexedSetter<T> = (i: number, el: T | null) => void;

type Props = {
  setCardRef: IndexedSetter<HTMLDivElement>;
  setShadowRef: IndexedSetter<HTMLElement>;
  setGlossRef: (el: HTMLElement | null) => void;
  setDotRef: IndexedSetter<HTMLElement>;
  setDotsWrapRef: (el: HTMLDivElement | null) => void;
};

const CARDS = [
  { src: "/brand/poprawne.png", alt: "Stojąca karta opinii Google na ladę", w: 1067, h: 1474 },
  { src: "/hero/naklejka.webp", alt: "Prostokątna naklejka opinii Google", w: 905, h: 900 },
  { src: "/hero/krazek.webp", alt: "Okrągły krążek opinii Google", w: 900, h: 900 },
];

/** Karuzela 3 kart (stojak / naklejka / krążek) + kropki postępu. */
export default function Carousel({
  setCardRef,
  setShadowRef,
  setGlossRef,
  setDotRef,
  setDotsWrapRef,
}: Props) {
  return (
    <>
      <div className="carousel">
        {CARDS.map((c, i) => (
          <div className="card" data-i={i} key={c.src} ref={(el) => setCardRef(i, el)}>
            <Image
              src={c.src}
              alt={c.alt}
              width={c.w}
              height={c.h}
              priority
              sizes="(max-width: 520px) 58vw, 260px"
            />
            {i === 0 && <i className="gloss" ref={(el) => setGlossRef(el)} />}
            <i className="cshadow" ref={(el) => setShadowRef(i, el)} />
          </div>
        ))}
      </div>
      <div className="dots" ref={(el) => setDotsWrapRef(el)}>
        {[0, 1, 2].map((i) => (
          <i key={i} className={i === 0 ? "on" : ""} ref={(el) => setDotRef(i, el)} />
        ))}
      </div>
    </>
  );
}

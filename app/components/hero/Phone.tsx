"use client";

import Image from "next/image";
import type { RefObject } from "react";

type Props = {
  phoneRef: RefObject<HTMLDivElement | null>;
  phOnRef: RefObject<HTMLImageElement | null>;
  wakeRef: RefObject<HTMLDivElement | null>;
};

/** Telefon: ta sama ramka, ekran "budzi się" przez crossfade off -> on. */
export default function Phone({ phoneRef, phOnRef, wakeRef }: Props) {
  return (
    <div className="phone" ref={phoneRef}>
      <Image
        className="ph-off"
        src="/hero/iphone-off.webp"
        alt=""
        width={800}
        height={1200}
        priority
        sizes="(max-width: 520px) 82vw, 370px"
      />
      <div className="wake" ref={wakeRef} />
      <Image
        className="ph-on"
        ref={phOnRef}
        src="/hero/iphone-on.webp"
        alt="Ekran wystawiania opinii w Google"
        width={800}
        height={1200}
        priority
        sizes="(max-width: 520px) 82vw, 370px"
      />
    </div>
  );
}

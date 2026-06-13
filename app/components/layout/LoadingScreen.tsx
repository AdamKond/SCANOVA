"use client";

import { useEffect, useState } from "react";
import Loader from "../ui/loader-5";

/** Pełnoekranowy ekran ładowania: logo nad animacją, znika płynnie. */
export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1300);
    const t2 = setTimeout(() => setGone(true), 1850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] bg-white transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* logo nad animacją */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/scanova-logo.svg"
        alt="Scanova"
        className="absolute left-1/2 top-1/2 h-10 w-auto -translate-x-1/2 -translate-y-[150px]"
      />
      <Loader />
    </div>
  );
}

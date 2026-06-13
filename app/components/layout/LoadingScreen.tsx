"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Loader from "../ui/loader-5";

/** Pełnoekranowy ekran ładowania: animowane logo nad loaderem, znika płynnie. */
export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1400);
    const t2 = setTimeout(() => setGone(true), 1950);
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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[170px]">
        <motion.img
          src="/brand/scanova-logo.svg"
          alt="Scanova"
          className="h-16 w-auto sm:h-24"
          initial={{ opacity: 0, scale: 0.8, y: 14 }}
          animate={
            fading
              ? { opacity: 0, scale: 1.1, y: -10 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <Loader />
    </div>
  );
}

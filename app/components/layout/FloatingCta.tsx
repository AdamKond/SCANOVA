"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

/** Pływający CTA w lewym dolnym rogu. */
export default function FloatingCta() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-6 z-40"
    >
      <Link
        href="/produkt/wizytowka-opinii-google"
        className="group relative flex items-center gap-3 rounded-full bg-blue-600 py-4 pl-4 pr-7 text-base font-bold text-white shadow-2xl shadow-blue-900/30 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/20">
          <span className="absolute inline-flex h-9 w-9 animate-ping rounded-full bg-white/30" />
          <Zap className="relative h-5 w-5" />
        </span>
        Kup w niecałą minutę
      </Link>
    </motion.div>
  );
}

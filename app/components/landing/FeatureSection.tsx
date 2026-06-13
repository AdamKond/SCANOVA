"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Check, ShieldCheck } from "lucide-react";

const BULLETS = [
  "Działa bez aplikacji — NFC + kod QR",
  "iPhone i Android",
  "Prowadzi prosto do okna opinii Google",
  "Konfiguracja pod Twój profil firmy",
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function FeatureSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
        {/* zdjęcie — kompaktowy, realny kadr */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white ring-1 ring-zinc-200/80 shadow-lg"
        >
          <Image
            src="/brand/product-nfc.png"
            alt="Wizytówka opinii Google z widocznym chipem NFC"
            fill
            sizes="(max-width: 1024px) 90vw, 440px"
            className="object-contain p-6"
          />
        </motion.div>

        {/* treść */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Jedna wizytówka.{" "}
            <span className="text-blue-600">Więcej opinii.</span>
          </h2>

          <ul className="mt-6 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-base text-zinc-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/produkt/wizytowka-opinii-google"
              className="rounded-full bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Zobacz produkty
            </Link>
            <span className="flex items-center gap-1.5 text-sm font-medium text-zinc-600">
              <ShieldCheck className="h-4 w-4 text-blue-600" /> Wyprodukowano w PL
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

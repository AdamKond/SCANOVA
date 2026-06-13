"use client";

import { motion, type Variants } from "motion/react";
import { QrCode, Nfc, Star } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── animowane kafelki ── */

function TileStand() {
  return (
    <div className="grid h-full place-items-center">
      <div className="animate-float rounded-2xl bg-white/95 p-5 shadow-xl">
        <QrCode className="h-14 w-14 text-[#07194a]" strokeWidth={1.6} />
      </div>
    </div>
  );
}

function TileTap() {
  return (
    <div className="relative grid h-full place-items-center">
      <span className="absolute h-20 w-20 animate-ping rounded-full bg-white/30" />
      <span
        className="absolute h-28 w-28 animate-ping rounded-full bg-white/20"
        style={{ animationDelay: "0.4s" }}
      />
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white text-blue-600 shadow-xl">
        <Nfc className="h-8 w-8" />
      </div>
    </div>
  );
}

function TileStars() {
  return (
    <div className="grid h-full place-items-center">
      <div className="flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-7 w-7 animate-pulse fill-amber-400 text-amber-400"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: "1",
    title: "Postaw przy kasie",
    desc: "Stojak, naklejka albo krążek — tam, gdzie klient kończy wizytę.",
    Tile: TileStand,
  },
  {
    n: "2",
    title: "Klient przykłada telefon",
    desc: "NFC albo skan kodu QR. Działa na iPhone i Androidzie, bez aplikacji.",
    Tile: TileTap,
  },
  {
    n: "3",
    title: "Opinia ląduje w Google",
    desc: "Profil rośnie, firma idzie w górę w Mapach, klienci trafiają do Ciebie.",
    Tile: TileStars,
  },
];

export default function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Jak to działa
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Trzy kroki. <span className="text-gradient">Serio.</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.n}
              variants={item}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-40 overflow-hidden rounded-xl bg-gradient-to-br from-[#0b2a6b] to-[#1e4fd6]">
                <s.Tile />
                <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-extrabold text-[#07194a]">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-zinc-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href="/produkt/wizytowka-opinii-google"
            className="inline-flex rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Zamów wizytówkę
          </a>
        </div>
      </div>
    </section>
  );
}

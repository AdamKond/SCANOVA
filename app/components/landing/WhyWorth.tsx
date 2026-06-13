"use client";

import { motion, type Variants } from "motion/react";
import {
  Zap,
  TrendingUp,
  Smartphone,
  Palette,
  Truck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

type Point = { Icon: LucideIcon; title: string; desc: string };

const POINTS: Point[] = [
  {
    Icon: Zap,
    title: "Gotowe w niecałą minutę",
    desc: "Klient wystawia opinię jednym dotknięciem — bez logowania i szukania.",
  },
  {
    Icon: TrendingUp,
    title: "Więcej opinii = wyższa pozycja",
    desc: "Lepszy profil w Google i Mapach przyciąga kolejnych klientów.",
  },
  {
    Icon: Smartphone,
    title: "Bez aplikacji",
    desc: "Działa od razu na iPhone i Androidzie — NFC albo kod QR.",
  },
  {
    Icon: Palette,
    title: "Personalizacja",
    desc: "Dopasujemy wizytówkę do brandingu i profilu Twojej firmy.",
  },
  {
    Icon: Truck,
    title: "Wysyłka następnego dnia",
    desc: "Zamów dziś, wyślemy jutro. W Polsce zwykle 1–2 dni.",
  },
  {
    Icon: ShieldCheck,
    title: "Trwałe i sprawdzone",
    desc: "Solidne materiały gotowe do codziennego użytku przy kasie.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyWorth() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50/60 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Dlaczego warto
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Opinie, które <span className="text-gradient">same się zbierają</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {POINTS.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
            >
              {/* poświata na hover */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/0 blur-2xl transition duration-300 group-hover:bg-blue-500/15" />
              {/* akcent u góry */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-400 to-blue-600 transition-transform duration-300 group-hover:scale-x-100" />

              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/30 transition duration-300 group-hover:scale-105">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-bold text-zinc-900">
                {title}
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-zinc-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

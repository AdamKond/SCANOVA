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
    <section className="bg-white py-20 lg:py-28">
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
              className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-blue-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-zinc-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

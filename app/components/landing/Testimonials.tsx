"use client";

import { motion, type Variants } from "motion/react";
import { Star, Quote } from "lucide-react";

type Review = { quote: string; name: string; role: string };

const REVIEWS: Review[] = [
  {
    quote:
      "Liczba opinii w Google wzrosła nam o 300% w pierwszym miesiącu. Klienci po prostu przykładają telefon.",
    name: "Karolina W.",
    role: "Kawiarnia, Kraków",
  },
  {
    quote:
      "Zero tłumaczenia jak wystawić opinię — stawiasz stojak przy kasie i działa samo. Genialne.",
    name: "Marek T.",
    role: "Barber Shop, Warszawa",
  },
  {
    quote:
      "Weszliśmy na pierwszą stronę Map Google w okolicy. Najlepsza inwestycja za te pieniądze.",
    name: "Aneta K.",
    role: "Salon kosmetyczny, Wrocław",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  return (
    <section className="bg-zinc-50 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Opinie klientów
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Pokochali <span className="text-gradient">więcej opinii</span>
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {REVIEWS.map((r) => (
            <motion.figure
              key={r.name}
              variants={item}
              className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-blue-100" />
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-zinc-700">
                „{r.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 font-display text-sm font-bold text-white">
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-zinc-900">{r.name}</span>
                  <span className="block text-xs text-zinc-500">{r.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

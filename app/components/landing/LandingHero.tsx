"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Check, Star } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07194a]">
      {/* desktop: zdjęcie jako tło */}
      <Image
        src="/brand/hero-najlepsza.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-right lg:block lg:translate-x-[3%]"
      />
      {/* desktop scrim */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#07194a] from-5% via-[#07194a]/45 via-[48%] to-transparent to-[72%] lg:block" />
      {/* dekoracyjna poświata */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:min-h-[78vh] lg:grid-cols-2 lg:gap-6 lg:py-0">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-lg">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100 backdrop-blur"
          >
            Wizytówki NFC + QR
          </motion.span>

          <motion.div variants={item} className="mt-5 flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400" />
            ))}
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-3 font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Pięć gwiazdek.
            <br />
            <span className="text-blue-300">Jednym tapnięciem.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base leading-relaxed text-blue-100/80 lg:text-lg"
          >
            Klient wystawia opinię w Google jednym dotknięciem — w niecałą minutę.
            Bez aplikacji, bez logowania, bez proszenia.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/produkt/wizytowka-opinii-google"
              className="rounded-full bg-white px-7 py-3.5 text-base font-bold text-[#07194a] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Zamów wizytówkę
            </Link>
            <Link
              href="#jak-to-dziala"
              className="rounded-full border border-white/30 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Zobacz, jak działa
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100/70"
          >
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-blue-300" /> Wyprodukowano w PL
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-blue-300" /> Wysyłka następnego dnia
            </span>
          </motion.div>
        </motion.div>

        {/* mobile: pełne zdjęcie pod tekstem (całe widoczne) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden"
        >
          <Image
            src="/brand/hero-najlepsza.png"
            alt="Stojak Scanova z wizytówką opinii Google"
            width={1672}
            height={941}
            priority
            sizes="100vw"
            className="w-full rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10"
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  thousands?: boolean;
  label: string;
};

const STATS: Stat[] = [
  { value: 12000, suffix: "+", thousands: true, label: "zebranych opinii" },
  { value: 500, suffix: "+", label: "zadowolonych firm" },
  { value: 4.9, decimals: 1, suffix: "★", label: "średnia ocena" },
  { value: 60, prefix: "< ", suffix: " s", label: "instalacja" },
];

function format(n: number, s: Stat) {
  const fixed = n.toFixed(s.decimals ?? 0);
  const withSep = s.thousands
    ? Number(fixed).toLocaleString("pl-PL")
    : fixed.replace(".", ",");
  return `${s.prefix ?? ""}${withSep}${s.suffix ?? ""}`;
}

function Counter({ stat, run }: { stat: Stat; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setVal(stat.value * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.value]);

  return (
    <span className="text-gradient font-display text-4xl font-extrabold tabular-nums sm:text-5xl">
      {format(val, stat)}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-white py-12 lg:py-16">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 px-4 text-center lg:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Counter stat={s} run={inView} />
            <span className="mt-1 text-sm font-medium text-zinc-500">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

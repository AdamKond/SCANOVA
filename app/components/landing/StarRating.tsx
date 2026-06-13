"use client";

import { useEffect, useRef, useState } from "react";

/* Port animacji Remotion (StarLoader) na web — 5 gwiazdek wypełnia się do 5,0,
   na końcu pierścień "gotowe". Pętla 150 klatek @ 30 fps. */

const D = 150;
const FPS = 30;

const GOLD = "#F5A623";
const GOLD_LIGHT = "#FFCB5E";
const EMPTY = "#E4E6EA";
const TEXT = "#1F2328";
const ACCENT = "#113463";

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const inCubic = (t: number) => t * t * t;

function interp(
  frame: number,
  [i0, i1]: [number, number],
  [o0, o1]: [number, number],
  easing?: (t: number) => number,
) {
  let t = clamp((frame - i0) / (i1 - i0), 0, 1);
  if (easing) t = easing(t);
  return o0 + (o1 - o0) * t;
}

function starPath(outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return "M" + pts.join("L") + "Z";
}

const SIZE = 1200;
const outerR = SIZE * 0.072;
const innerR = outerR * 0.382;
const spacing = outerR * 2.5;
const cx = SIZE / 2;
const cy = SIZE / 2;
const firstX = cx - spacing * 2;
const PATH = starPath(outerR, innerR);

export default function StarRating() {
  const [frame, setFrame] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrame(120);
      return;
    }
    const start = performance.now();
    const loop = (now: number) => {
      setFrame((((now - start) / 1000) * FPS) % D);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const appear = interp(frame, [0, D * 0.1], [0, 1], outCubic);
  const exit = interp(frame, [D * 0.86, D], [0, 1], inCubic);
  const groupOpacity = appear * (1 - exit);
  const groupScale = (0.92 + 0.08 * appear) * (1 + 0.07 * exit);

  const stars = [0, 1, 2, 3, 4].map((i) => {
    const startF = D * 0.1 + i * (D * 0.125);
    const f = interp(frame, [startF, startF + D * 0.12], [0, 1], outCubic);
    const pop = Math.sin(clamp(f, 0, 1) * Math.PI) * 0.16;
    return { x: firstX + i * spacing, f, pop };
  });
  const ratingValue = stars.reduce((s, st) => s + st.f, 0);
  const ring = interp(frame, [D * 0.72, D * 0.72 + D * 0.16], [0, 1], outCubic);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Opinie, które robią różnicę
        </p>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mt-2 w-full max-w-[360px]"
          style={{ overflow: "visible", opacity: groupOpacity }}
        >
          <defs>
            <linearGradient id="sr-gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD_LIGHT} />
              <stop offset="100%" stopColor={GOLD} />
            </linearGradient>
            {stars.map((st, i) => {
              const fillH = st.f * outerR * 2;
              return (
                <clipPath id={`sr-fill-${i}`} key={i}>
                  <rect
                    x={-outerR - 2}
                    y={outerR - fillH}
                    width={outerR * 2 + 4}
                    height={fillH}
                  />
                </clipPath>
              );
            })}
          </defs>

          <g transform={`translate(${cx} ${cy}) scale(${groupScale}) translate(${-cx} ${-cy})`}>
            <ellipse
              cx={cx}
              cy={cy + outerR * 1.7}
              rx={spacing * 2.4}
              ry={outerR * 0.28}
              fill={ACCENT}
              opacity={(0.18 * ratingValue) / 5}
            />
            {ring > 0 && (
              <circle
                cx={cx}
                cy={cy}
                r={outerR * (1.6 + ring * 2.6)}
                fill="none"
                stroke={ACCENT}
                strokeWidth={SIZE * 0.004}
                opacity={(1 - ring) * 0.6}
              />
            )}
            {stars.map((st, i) => (
              <g key={i} transform={`translate(${st.x} ${cy}) scale(${1 + st.pop})`}>
                <path
                  d={PATH}
                  fill={EMPTY}
                  stroke={EMPTY}
                  strokeWidth={SIZE * 0.002}
                  strokeLinejoin="round"
                />
                <path
                  d={PATH}
                  fill="url(#sr-gold)"
                  stroke={GOLD}
                  strokeWidth={SIZE * 0.002}
                  strokeLinejoin="round"
                  clipPath={`url(#sr-fill-${i})`}
                />
              </g>
            ))}
          </g>
        </svg>

        <div
          className="mt-1 font-display text-4xl font-extrabold tabular-nums"
          style={{ color: TEXT, opacity: groupOpacity }}
        >
          {ratingValue.toFixed(1)}
        </div>
        <p className="mt-1 text-sm text-zinc-500">Średnia ocena klientów</p>
      </div>
    </section>
  );
}

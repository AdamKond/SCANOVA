"use client";

import "./hero.css";
import { useEffect, useRef } from "react";
import { useScroll, useAnimationFrame } from "motion/react";
import Carousel from "./Carousel";
import Phone from "./Phone";
import Notification from "./Notification";

/* ── helpery i progi przeniesione 1:1 z reference/hero-demo-v3.html ── */
const BDIR: ReadonlyArray<readonly [number, number]> = [
  [-130, 116],
  [-75, 138],
  [-15, 122],
  [35, 132],
  [95, 112],
];
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const ioCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const oCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const oBack = (t: number) => {
  const c1 = 1.9;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const rel = (i: number, c: number) => {
  let r = (i - c) % 3;
  if (r > 1.5) r -= 3;
  if (r < -1.5) r += 3;
  return r;
};

export default function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyARef = useRef<HTMLDivElement>(null);
  const copyBRef = useRef<HTMLDivElement>(null);
  const copyCRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLElement | null)[]>([]);
  const glossRef = useRef<HTMLElement | null>(null);
  const dotRefs = useRef<(HTMLElement | null)[]>([]);
  const dotsWrapRef = useRef<HTMLDivElement | null>(null);

  const phoneRef = useRef<HTMLDivElement>(null);
  const phOnRef = useRef<HTMLImageElement>(null);
  const wakeRef = useRef<HTMLDivElement>(null);

  const rippleRefs = useRef<(HTMLElement | null)[]>([]);
  const rippleWrapRef = useRef<HTMLDivElement>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const burstRefs = useRef<(HTMLElement | null)[]>([]);

  const payoffRef = useRef<HTMLDivElement>(null);

  const reduced = useRef(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useAnimationFrame((tms) => {
    if (reduced.current) return;

    const stage = stageRef.current;
    if (!stage) return;

    const p = scrollYProgress.get();
    const tsec = tms / 1000;

    /* copy */
    const aOut = 1 - seg(p, 0.05, 0.12);
    if (copyARef.current) {
      copyARef.current.style.opacity = String(aOut);
      copyARef.current.style.transform = `translateY(${-12 * (1 - aOut)}px)`;
    }
    if (copyBRef.current)
      copyBRef.current.style.opacity = String(seg(p, 0.1, 0.16) * (1 - seg(p, 0.4, 0.47)));
    if (copyCRef.current)
      copyCRef.current.style.opacity = String(seg(p, 0.47, 0.54) * (1 - seg(p, 0.68, 0.74)));
    if (hintRef.current) hintRef.current.style.opacity = String(1 - seg(p, 0.02, 0.07));

    /* carousel cycle */
    const c = 3 * ioCubic(seg(p, 0.08, 0.4));
    const settle = oCubic(seg(p, 0.4, 0.5));
    const tapNudge = seg(p, 0.645, 0.69);

    for (let i = 0; i < 3; i++) {
      const el = cardRefs.current[i];
      const sh = shadowRefs.current[i];
      if (!el) continue;

      const r = rel(i, c);
      const ar = Math.abs(r);
      let x = r * 78;
      let sc = 1 - 0.24 * Math.min(1, ar);
      let op = 1 - 0.45 * Math.min(1, ar);
      let rz = r * -4;
      if (ar > 1.2) op *= Math.max(0, (1.5 - ar) / 0.3);

      /* lewitacja: delikatne bujanie; wygasa gdy stojak ustawia się do dotyku */
      const amp = 8 * (i === 0 ? 1 - settle : 1);
      const lev = Math.sin(tsec * 1.3 + i * 2.1) * amp;
      const norm = amp > 0.01 ? (amp - lev) / (2 * amp) : 0.5; /* 0 = góra, 1 = dół */
      if (sh) {
        sh.style.transform = `translateX(-50%) scale(${0.82 + 0.24 * norm})`;
        sh.style.opacity = String((0.35 + 0.45 * norm) * (i === 0 ? 1 - 0.35 * settle : 1));
      }

      if (i === 0) {
        x = x * (1 - settle);
        sc = sc + (1.08 - sc) * settle - 0.035 * Math.sin(tapNudge * Math.PI);
        op = op + (1 - op) * settle;
        rz = rz * (1 - settle);
        el.style.transform = `translate(calc(-50% + ${x}%),calc(-50% + ${-5 * settle}%)) translateY(${lev}px) scale(${sc}) rotate(${rz}deg)`;
        el.style.opacity = String(op);
        el.style.zIndex = "10";
      } else {
        x = x + (r > 0 ? 70 : -70) * settle;
        el.style.transform = `translate(calc(-50% + ${x}%),-50%) translateY(${lev}px) scale(${sc}) rotate(${rz}deg)`;
        el.style.opacity = String(op * (1 - settle));
        el.style.zIndex = ar < 0.5 ? "9" : "8";
      }
    }

    /* gloss sweep po stojaku podczas settle */
    if (glossRef.current) {
      const gp = seg(p, 0.42, 0.56);
      glossRef.current.style.backgroundPosition = `${140 - 200 * oCubic(gp)}% 0`;
      glossRef.current.style.opacity = gp > 0 && gp < 1 ? "1" : "0";
    }

    const active = ((Math.round(c) % 3) + 3) % 3;
    dotRefs.current.forEach((d, i) => d?.classList.toggle("on", i === active));
    if (dotsWrapRef.current)
      dotsWrapRef.current.style.opacity = String(seg(p, 0.07, 0.11) * (1 - seg(p, 0.4, 0.46)));

    /* camera push-in: cała scena zbliża się do akcji */
    const push = oCubic(seg(p, 0.55, 0.8));
    stage.style.transform = `scale(${1 + 0.07 * push})`;

    /* telefon: wjazd z dołu, dochodzi do karty */
    if (phoneRef.current) {
      const ph = oCubic(seg(p, 0.5, 0.68));
      const py = 120 - 126 * ph;
      const prot = -10 + 9 * oCubic(seg(p, 0.5, 0.8));
      phoneRef.current.style.transform = `translate(-50%,${py}%) rotate(${prot}deg)`;
    }

    /* kontakt: fale NFC + budzenie ekranu */
    const contact = seg(p, 0.635, 0.71);
    rippleRefs.current.forEach((rp, i) => {
      if (!rp) return;
      const t = clamp01(contact * 1.6 - i * 0.22);
      rp.style.opacity = t > 0 ? String((1 - t) * 0.9) : "0";
      rp.style.transform = `scale(${0.4 + 2.5 * oCubic(t)})`;
    });
    if (rippleWrapRef.current)
      rippleWrapRef.current.style.opacity = contact > 0 && contact < 1 ? "1" : "0";

    const on = seg(p, 0.655, 0.715);
    if (phOnRef.current) phOnRef.current.style.opacity = String(on);
    if (wakeRef.current)
      wakeRef.current.style.opacity = String(Math.sin(Math.PI * seg(p, 0.65, 0.78)) * 0.9);

    /* powiadomienie: wjazd z przestrzeleniem + flash + drganie */
    if (notifRef.current) {
      const nd = seg(p, 0.73, 0.82);
      const ny = -180 + 180 * oBack(nd);
      const shake = seg(p, 0.82, 0.875);
      const sx = Math.sin(shake * Math.PI * 4) * (1 - shake) * 4;
      notifRef.current.style.transform = `translate(calc(-50% + ${sx}px),${ny}%) scale(${0.92 + 0.08 * oCubic(nd)})`;
      notifRef.current.style.opacity = String(seg(p, 0.73, 0.77));
    }
    if (flashRef.current)
      flashRef.current.style.opacity = String(Math.sin(Math.PI * seg(p, 0.73, 0.8)) * 0.85);

    /* burst gwiazdek */
    const bt = seg(p, 0.765, 0.9);
    burstRefs.current.forEach((b, i) => {
      if (!b) return;
      const e = oCubic(bt);
      const a = (BDIR[i][0] * Math.PI) / 180;
      const d = BDIR[i][1] * e;
      b.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) rotate(${e * 140}deg) scale(${0.5 + 0.7 * e})`;
      b.style.opacity = bt > 0 ? String(Math.sin(Math.PI * Math.min(1, bt * 1.15))) : "0";
    });

    /* payoff */
    if (payoffRef.current) {
      const po = seg(p, 0.84, 0.93);
      payoffRef.current.style.opacity = String(po);
      payoffRef.current.style.transform = `translateY(${-14 + 14 * oCubic(po)}px)`;
    }

  });

  return (
    <>
      <section className="hero-track" ref={trackRef}>
        <div className="hero-stage">
          <div className="stage-inner" ref={stageRef}>
            <div className="orb o1" />
            <div className="orb o2" />
            <div className="orb o3" />
            <div className="glow" />

            <div className="copy">
              <div className="copy-a" ref={copyARef}>
                <span className="eyebrow">Karty opinii Google · NFC + QR</span>
                <h1>
                  Więcej opinii w <span className="gword">Google.</span>
                </h1>
                <p className="sub">Jedno dotknięcie telefonu. Zero proszenia.</p>
              </div>
              <div className="copy-b" ref={copyBRef}>
                <p className="caption">Wybierz format — stojak, naklejka lub krążek</p>
              </div>
              <div className="copy-c" ref={copyCRef}>
                <p className="caption">Klient przykłada telefon…</p>
              </div>
            </div>

            <Carousel
              setCardRef={(i, el) => {
                cardRefs.current[i] = el;
              }}
              setShadowRef={(i, el) => {
                shadowRefs.current[i] = el;
              }}
              setGlossRef={(el) => {
                glossRef.current = el;
              }}
              setDotRef={(i, el) => {
                dotRefs.current[i] = el;
              }}
              setDotsWrapRef={(el) => {
                dotsWrapRef.current = el;
              }}
            />

            <div className="ripples" ref={rippleWrapRef}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  ref={(el) => {
                    rippleRefs.current[i] = el;
                  }}
                />
              ))}
            </div>

            <Phone phoneRef={phoneRef} phOnRef={phOnRef} wakeRef={wakeRef} />

            <Notification
              notifRef={notifRef}
              flashRef={flashRef}
              setBurstRef={(i, el) => {
                burstRefs.current[i] = el;
              }}
            />

            <div className="payoff" ref={payoffRef}>
              <div className="payoff-badge">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2>
                Opinia gotowa. <span className="accent">Tyle.</span>
              </h2>
              <p>Bez aplikacji, bez szukania firmy, bez proszenia.</p>
            </div>

            <div className="hint" ref={hintRef}>
              <div className="wheel" />
              <span>przewiń</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

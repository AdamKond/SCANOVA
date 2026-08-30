"use client";

/**
 * LoadingScreen — samowystarczalny ekran ładowania (1:1 z projektu Scanova).
 *
 * ZERO zależności zewnętrznych (bez motion/react i bez styled-components),
 * więc wystarczy wrzucić ten jeden plik do dowolnego projektu React / Next.js.
 *
 * Użycie:
 *   import LoadingScreen from "./LoadingScreen.standalone";
 *   ...
 *   <LoadingScreen logoSrc="/brand/scanova-logo.svg" />
 *
 * WAŻNE: skopiuj też plik logo (domyślnie /brand/scanova-logo.svg) do folderu
 * public/ drugiego projektu, albo podaj własną ścieżkę przez prop `logoSrc`.
 */

import { useEffect, useState } from "react";

const GROUPS = [4, 8, 12, 18, 24, 36];

type Props = {
  /** kiedy zacząć znikać (ms) */
  fadeAt?: number;
  /** kiedy usunąć z DOM (ms) */
  removeAt?: number;
  /** ścieżka do logo */
  logoSrc?: string;
  /** alt logo */
  logoAlt?: string;
};

export default function LoadingScreen({
  fadeAt = 2400,
  removeAt = 2950,
  logoSrc = "/brand/scanova-logo.svg",
  logoAlt = "Scanova",
}: Props) {
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), fadeAt);
    const t2 = setTimeout(() => setGone(true), removeAt);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [fadeAt, removeAt]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#fff",
        transition: "opacity 500ms",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <style>{LOADER_CSS}</style>

      {/* Logo nad loaderem — animacja 1:1 (cubic-bezier 0.22,1,0.36,1; 0.55s) */}
      <div className="ls-logo-wrap">
        <img
          src={logoSrc}
          alt={logoAlt}
          className={`ls-logo ${fading ? "ls-logo--out" : "ls-logo--in"}`}
        />
      </div>

      {/* 3D loader z kropek */}
      <div className="loader">
        {GROUPS.map((count, gi) => (
          <div className="dots" key={gi}>
            {Array.from({ length: count }).map((_, di) => (
              <div className="dot" key={di} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const LOADER_CSS = `
/* ---------- LOGO ---------- */
.ls-logo-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -170px);
}
.ls-logo {
  height: 4rem; /* h-16 */
  width: auto;
  transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
@media (min-width: 640px) {
  .ls-logo { height: 6rem; } /* sm:h-24 */
}
/* stan początkowy = initial framera, dochodzi do "animate" przez animację wejścia */
.ls-logo--in {
  opacity: 1;
  transform: scale(1) translateY(0);
  animation: ls-logo-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.ls-logo--out {
  opacity: 0;
  transform: scale(1.1) translateY(-10px);
}
@keyframes ls-logo-in {
  from { opacity: 0; transform: scale(0.8) translateY(14px); }
  to   { opacity: 1; transform: scale(1)   translateY(0);    }
}

/* ---------- LOADER (3D dots) ---------- */
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -100px;
  perspective: 1000px;
  transform-style: perserve-3d; /* literówka z oryginału — zostawiona celowo dla 1:1 */
}

.dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  perspective: 200px;
  transform-style: perserve-3d; /* j.w. */
  animation: dots 10000ms linear infinite;
}

.dots:nth-child(1) { animation-name: dots; }
.dots:nth-child(2) { animation-name: dots2; }
.dots:nth-child(3) { animation-name: dots3; }
.dots:nth-child(4) { animation-name: dots4; }
.dots:nth-child(5) { animation-name: dots5; }
.dots:nth-child(6) { animation-name: dots6; }

@keyframes dots {
  0%   { transform: rotateX(30deg) rotateZ(0deg)     translateZ(-50px); }
  50%  { transform: rotateX(60deg) rotateZ(5760deg)  translateZ(-100px); }
  100% { transform: rotateX(30deg) rotateZ(11520deg) translateZ(-50px); }
}
@keyframes dots2 {
  0%   { transform: rotateX(30deg) rotateZ(0deg)    translateZ(-36px); }
  50%  { transform: rotateX(60deg) rotateZ(2880deg) translateZ(-72px); }
  100% { transform: rotateX(30deg) rotateZ(5760deg) translateZ(-36px); }
}
@keyframes dots3 {
  0%   { transform: rotateX(30deg) rotateZ(0deg)    translateZ(-24px); }
  50%  { transform: rotateX(60deg) rotateZ(1440deg) translateZ(-48px); }
  100% { transform: rotateX(30deg) rotateZ(2880deg) translateZ(-24px); }
}
@keyframes dots4 {
  0%   { transform: rotateX(30deg) rotateZ(0deg)   translateZ(-14px); }
  50%  { transform: rotateX(60deg) rotateZ(720deg) translateZ(-28px); }
  100% { transform: rotateX(30deg) rotateZ(1440deg) translateZ(-14px); }
}
@keyframes dots5 {
  0%   { transform: rotateX(30deg) rotateZ(0deg)   translateZ(-6px); }
  50%  { transform: rotateX(60deg) rotateZ(360deg) translateZ(-12px); }
  100% { transform: rotateX(30deg) rotateZ(720deg) translateZ(-6px); }
}
@keyframes dots6 {
  0%   { transform: rotateX(30deg) rotateZ(0deg)   translateZ(0px); }
  50%  { transform: rotateX(60deg) rotateZ(180deg) translateZ(-3px); }
  100% { transform: rotateX(30deg) rotateZ(360deg) translateZ(0px); }
}

.dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;
  border-radius: 100px;
  background-color: #1e3f57;
  transform-style: perserve-3d; /* literówka z oryginału — zostawiona celowo dla 1:1 */
  transform: rotateZ(0) translateY(0);
}

.dots:nth-child(6) .dot { background-color: #1e3f57; }

.dots:nth-child(1) .dot:nth-child(1) { transform: rotateZ(0)      translateY(-10px); }
.dots:nth-child(1) .dot:nth-child(2) { transform: rotateZ(90deg)  translateY(-10px) translateZ(-140px); }
.dots:nth-child(1) .dot:nth-child(3) { transform: rotateZ(180deg) translateY(-10px); }
.dots:nth-child(1) .dot:nth-child(4) { transform: rotateZ(270deg) translateY(-10px) translateZ(-140px); }

.dots:nth-child(5) .dot { background-color: #295068; }

.dots:nth-child(2) .dot:nth-child(1) { transform: rotateZ(0)      translateY(-22px); }
.dots:nth-child(2) .dot:nth-child(2) { transform: rotateZ(45deg)  translateY(-22px) translateZ(-120px); }
.dots:nth-child(2) .dot:nth-child(3) { transform: rotateZ(90deg)  translateY(-22px); }
.dots:nth-child(2) .dot:nth-child(4) { transform: rotateZ(135deg) translateY(-22px) translateZ(-120px); }
.dots:nth-child(2) .dot:nth-child(5) { transform: rotateZ(180deg) translateY(-22px); }
.dots:nth-child(2) .dot:nth-child(6) { transform: rotateZ(225deg) translateY(-22px) translateZ(-120px); }
.dots:nth-child(2) .dot:nth-child(7) { transform: rotateZ(270deg) translateY(-22px); }
.dots:nth-child(2) .dot:nth-child(8) { transform: rotateZ(315deg) translateY(-22px) translateZ(-120px); }

.dots:nth-child(4) .dot { background-color: #3b6a83; }

.dots:nth-child(3) .dot:nth-child(1)  { transform: rotateZ(0)      translateY(-34px); }
.dots:nth-child(3) .dot:nth-child(2)  { transform: rotateZ(30deg)  translateY(-34px) translateZ(-100px); }
.dots:nth-child(3) .dot:nth-child(3)  { transform: rotateZ(60deg)  translateY(-34px); }
.dots:nth-child(3) .dot:nth-child(4)  { transform: rotateZ(90deg)  translateY(-34px) translateZ(-100px); }
.dots:nth-child(3) .dot:nth-child(5)  { transform: rotateZ(120deg) translateY(-34px); }
.dots:nth-child(3) .dot:nth-child(6)  { transform: rotateZ(150deg) translateY(-34px) translateZ(-100px); }
.dots:nth-child(3) .dot:nth-child(7)  { transform: rotateZ(180deg) translateY(-34px); }
.dots:nth-child(3) .dot:nth-child(8)  { transform: rotateZ(210deg) translateY(-34px) translateZ(-100px); }
.dots:nth-child(3) .dot:nth-child(9)  { transform: rotateZ(240deg) translateY(-34px); }
.dots:nth-child(3) .dot:nth-child(10) { transform: rotateZ(270deg) translateY(-34px) translateZ(-100px); }
.dots:nth-child(3) .dot:nth-child(11) { transform: rotateZ(300deg) translateY(-34px); }
.dots:nth-child(3) .dot:nth-child(12) { transform: rotateZ(330deg) translateY(-34px) translateZ(-100px); }

.dots:nth-child(3) .dot { background-color: #4d86a0; }

.dots:nth-child(4) .dot:nth-child(1)  { transform: rotateZ(0)      translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(2)  { transform: rotateZ(20deg)  translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(3)  { transform: rotateZ(40deg)  translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(4)  { transform: rotateZ(60deg)  translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(5)  { transform: rotateZ(80deg)  translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(6)  { transform: rotateZ(100deg) translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(7)  { transform: rotateZ(120deg) translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(8)  { transform: rotateZ(140deg) translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(9)  { transform: rotateZ(160deg) translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(10) { transform: rotateZ(180deg) translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(11) { transform: rotateZ(200deg) translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(12) { transform: rotateZ(220deg) translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(13) { transform: rotateZ(240deg) translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(14) { transform: rotateZ(260deg) translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(15) { transform: rotateZ(280deg) translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(16) { transform: rotateZ(300deg) translateY(-46px) translateZ(-80px); }
.dots:nth-child(4) .dot:nth-child(17) { transform: rotateZ(320deg) translateY(-46px); }
.dots:nth-child(4) .dot:nth-child(18) { transform: rotateZ(340deg) translateY(-46px) translateZ(-80px); }

.dots:nth-child(2) .dot { background-color: #5ea0ba; }

.dots:nth-child(5) .dot:nth-child(1)  { transform: rotateZ(0)      translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(2)  { transform: rotateZ(15deg)  translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(3)  { transform: rotateZ(30deg)  translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(4)  { transform: rotateZ(45deg)  translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(5)  { transform: rotateZ(60deg)  translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(6)  { transform: rotateZ(75deg)  translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(7)  { transform: rotateZ(90deg)  translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(8)  { transform: rotateZ(105deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(9)  { transform: rotateZ(120deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(10) { transform: rotateZ(135deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(11) { transform: rotateZ(150deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(12) { transform: rotateZ(165deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(13) { transform: rotateZ(180deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(14) { transform: rotateZ(195deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(15) { transform: rotateZ(210deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(16) { transform: rotateZ(225deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(17) { transform: rotateZ(240deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(18) { transform: rotateZ(255deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(19) { transform: rotateZ(270deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(20) { transform: rotateZ(285deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(21) { transform: rotateZ(300deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(22) { transform: rotateZ(315deg) translateY(-58px) translateZ(-40px); }
.dots:nth-child(5) .dot:nth-child(23) { transform: rotateZ(330deg) translateY(-58px); }
.dots:nth-child(5) .dot:nth-child(24) { transform: rotateZ(345deg) translateY(-58px) translateZ(-40px); }

.dots:nth-child(1) .dot { background-color: #6bb1cd; }

.dots:nth-child(6) .dot:nth-child(1)  { transform: rotateZ(0deg)   translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(2)  { transform: rotateZ(10deg)  translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(3)  { transform: rotateZ(20deg)  translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(4)  { transform: rotateZ(30deg)  translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(5)  { transform: rotateZ(40deg)  translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(6)  { transform: rotateZ(50deg)  translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(7)  { transform: rotateZ(60deg)  translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(8)  { transform: rotateZ(70deg)  translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(9)  { transform: rotateZ(80deg)  translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(10) { transform: rotateZ(90deg)  translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(11) { transform: rotateZ(100deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(12) { transform: rotateZ(110deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(13) { transform: rotateZ(120deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(14) { transform: rotateZ(130deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(15) { transform: rotateZ(140deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(16) { transform: rotateZ(150deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(17) { transform: rotateZ(160deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(18) { transform: rotateZ(170deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(19) { transform: rotateZ(180deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(20) { transform: rotateZ(190deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(21) { transform: rotateZ(200deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(22) { transform: rotateZ(210deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(23) { transform: rotateZ(220deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(24) { transform: rotateZ(230deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(25) { transform: rotateZ(240deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(26) { transform: rotateZ(250deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(27) { transform: rotateZ(260deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(28) { transform: rotateZ(270deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(29) { transform: rotateZ(280deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(30) { transform: rotateZ(290deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(31) { transform: rotateZ(300deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(32) { transform: rotateZ(310deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(33) { transform: rotateZ(320deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(34) { transform: rotateZ(330deg) translateY(-70px) translateZ(-20px); }
.dots:nth-child(6) .dot:nth-child(35) { transform: rotateZ(340deg) translateY(-70px); }
.dots:nth-child(6) .dot:nth-child(36) { transform: rotateZ(350deg) translateY(-70px) translateZ(-20px); }
`;

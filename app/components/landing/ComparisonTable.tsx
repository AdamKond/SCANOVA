"use client";

import { Fragment } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { motion } from "motion/react";

type Row = { label: string; scanova: boolean; qr: boolean; nfc: boolean };

const ROWS: Row[] = [
  { label: "NFC + QR w jednym", scanova: true, qr: false, nfc: false },
  { label: "Personalizacja brandingowa", scanova: true, qr: true, nfc: false },
  { label: "Gotowy stojak na ladę", scanova: true, qr: true, nfc: false },
  { label: "Szybkie wystawienie opinii", scanova: true, qr: true, nfc: true },
  { label: "Profesjonalny wygląd", scanova: true, qr: false, nfc: false },
  { label: "Bez aplikacji", scanova: true, qr: true, nfc: true },
];

function Mark({ ok, light = false }: { ok: boolean; light?: boolean }) {
  if (ok) {
    return (
      <CircleCheck
        className={`h-5 w-5 sm:h-6 sm:w-6 ${light ? "text-white" : "text-blue-600"}`}
        strokeWidth={2.25}
      />
    );
  }
  return <CircleX className="h-5 w-5 text-blue-300 sm:h-6 sm:w-6" strokeWidth={2.25} />;
}

export default function ComparisonTable() {
  const last = ROWS.length - 1;
  return (
    <section className="bg-zinc-100 py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-4xl px-4"
      >
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          Dlaczego Scanova?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-zinc-600">
          Wszystko w jednym — czego nie dają zwykłe stojaki QR ani karty NFC.
        </p>

        <div className="mt-12 grid grid-cols-[1.25fr_1fr_1fr_1fr] text-center">
          {/* nagłówek */}
          <div aria-hidden />
          <div className="flex items-center justify-center rounded-t-3xl bg-blue-700 px-2 pb-3 pt-6">
            <span className="flex items-center rounded-xl bg-white px-3 py-2 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/scanova-logo.svg" alt="Scanova" className="h-5 w-auto sm:h-7" />
            </span>
          </div>
          <div className="self-end px-1 pb-3 text-xs font-bold leading-tight text-blue-900 sm:text-base">
            Stojak
            <br />
            tylko QR
          </div>
          <div className="self-end px-1 pb-3 text-xs font-bold leading-tight text-blue-900 sm:text-base">
            Karta
            <br />
            tylko NFC
          </div>

          {/* wiersze */}
          {ROWS.map((r, i) => (
            <Fragment key={r.label}>
              <div className="flex items-center border-t border-zinc-300 py-4 pr-2 text-left text-xs font-semibold text-blue-900 sm:text-base">
                {r.label}
              </div>
              <div
                className={`flex items-center justify-center bg-blue-700 py-4 ${
                  i === last ? "rounded-b-3xl" : ""
                }`}
              >
                <Mark ok={r.scanova} light />
              </div>
              <div className="flex items-center justify-center border-t border-zinc-300 py-4">
                <Mark ok={r.qr} />
              </div>
              <div className="flex items-center justify-center border-t border-zinc-300 py-4">
                <Mark ok={r.nfc} />
              </div>
            </Fragment>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

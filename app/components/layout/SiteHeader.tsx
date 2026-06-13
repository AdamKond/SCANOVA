"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Home, Store, ShoppingCart } from "lucide-react";

const ITEMS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Sklep", href: "/produkt/wizytowka-opinii-google", Icon: Store },
  { label: "Koszyk", href: "#koszyk", Icon: ShoppingCart },
];

/** Prosty nagłówek: logo z lewej, przycisk-menu (hamburger) z prawej. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="Scanova — strona główna" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/scanova-logo.svg" alt="Scanova" className="h-9 w-auto sm:h-10" />
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 text-zinc-800 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <AnimatePresence>
            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <motion.nav
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-1.5 shadow-xl"
                >
                  {ITEMS.map(({ label, href, Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </motion.nav>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

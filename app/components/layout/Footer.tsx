import Link from "next/link";
import Accordion from "../product/Accordion";

const FAQ = [
  {
    title: "Czy to działa na iPhone i Androidzie?",
    body: "Tak. NFC działa na większości nowszych telefonów, a kod QR na każdym aparacie — bez instalowania żadnej aplikacji.",
  },
  {
    title: "Czy muszę coś konfigurować?",
    body: "Nie. Wizytówkę konfigurujemy pod Twój profil firmy w Google przed wysyłką — działa od razu po rozpakowaniu.",
  },
  {
    title: "Jak szybko dotrze zamówienie?",
    body: "Wysyłamy następnego dnia roboczego. Na terenie Polski przesyłka dociera zwykle w 1–2 dni.",
  },
  {
    title: "Czy mogę dodać własne logo i branding?",
    body: "Tak, oferujemy personalizację brandingową — dopasujemy wizytówkę do wyglądu Twojej firmy.",
  },
  {
    title: "Co jeśli klient nie ma NFC?",
    body: "Zawsze może zeskanować kod QR — efekt jest dokładnie ten sam, czyli okno wystawienia opinii w Google.",
  },
];

export default function Footer() {
  return (
    <footer>
      {/* FAQ */}
      <section className="bg-zinc-50 py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
            FAQ
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Najczęstsze pytania
          </h2>
          <div className="mt-10">
            <Accordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* pasek stopki */}
      <div className="bg-[#07194a] text-blue-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
          <span className="font-display text-2xl font-extrabold text-white">Scanova</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/produkt/wizytowka-opinii-google" className="transition hover:text-white">
              Sklep
            </Link>
            <Link href="#kontakt" className="transition hover:text-white">
              Kontakt
            </Link>
          </nav>
          <span className="text-sm text-blue-200/70">© 2026 Scanova</span>
        </div>
      </div>
    </footer>
  );
}

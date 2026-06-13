/**
 * Dane produktów (PDP). Wszystko jest "data-driven" — żeby podmienić treści,
 * edytuj wyłącznie ten plik. Zdjęcia leżą w public/products/ (podmień pliki
 * zachowując nazwy, a strona zaktualizuje się sama).
 *
 * Model cen: format ma basePrice, próg ilości ma discount.
 *   cena      = basePrice * qty * (1 - discount)
 *   compareAt = basePrice * qty           (cena "przekreślona")
 *   oszczędzasz = round(discount * 100) %
 */

export type GalleryImage = { src: string; alt: string };

export type Format = {
  id: string;
  label: string;
  blurb: string;
  basePrice: number; // PLN
  gallery: GalleryImage[];
};

export type QuantityTier = {
  qty: number;
  label: string;
  discount: number; // 0..1
  badge?: string;
};

/** icon = klucz mapowany na ikonę lucide w komponencie (IconBadge / FeatureChips). */
export type Feature = { icon: string; label: string };
export type TrustBadge = { icon: string; label: string };
export type AccordionItem = { title: string; body: string };

export type Product = {
  slug: string;
  name: string;
  rating: { value: number; count: number };
  features: Feature[];
  formats: Format[];
  quantities: QuantityTier[];
  trust: TrustBadge[];
  accordions: AccordionItem[];
  marquee: string[];
};

const PLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return PLN.format(value);
}

/** Cena/oszczędność dla wybranej pary (format + próg ilości). */
export function computePricing(format: Format, tier: QuantityTier) {
  const compareAt = format.basePrice * tier.qty;
  const price = compareAt * (1 - tier.discount);
  const savePct = Math.round(tier.discount * 100);
  const saveAmount = compareAt - price;
  return { price, compareAt, savePct, saveAmount };
}

export const products: Product[] = [
  {
    slug: "wizytowka-opinii-google",
    name: "Wizytówka opinii Google",
    rating: { value: 4.9, count: 212 },
    features: [
      { icon: "nfc", label: "NFC + QR" },
      { icon: "smartphone", label: "iPhone i Android" },
      { icon: "zap", label: "Bez aplikacji" },
      { icon: "star", label: "Więcej opinii" },
    ],
    formats: [
      {
        id: "stojak",
        label: "Stojak",
        blurb: "Akryl na ladę · 12,75 cm",
        basePrice: 79,
        gallery: [
          { src: "/brand/poprawne.png", alt: "Stojak na opinie Google" },
          { src: "/products/stojak-2.webp", alt: "Stojak na opinie Google na biurku" },
          { src: "/brand/product-nfc.png", alt: "Stojak na opinie Google z widocznym chipem NFC" },
        ],
      },
      {
        id: "naklejka",
        label: "Naklejka",
        blurb: "Kwadrat 12 cm · samoprzylepna",
        basePrice: 49,
        gallery: [
          { src: "/products/naklejka-1.webp", alt: "Naklejka opinii Google — kwadrat, klej z tyłu" },
          { src: "/products/naklejka-2.webp", alt: "Naklejka opinii Google — wymiary" },
          { src: "/products/naklejka-3.webp", alt: "Naklejka opinii Google — wystawianie opinii w telefonie" },
        ],
      },
      {
        id: "krazek",
        label: "Krążek",
        blurb: "Okrąg 10 cm · samoprzylepny",
        basePrice: 45,
        gallery: [
          { src: "/products/krazek-1.webp", alt: "Krążek opinii Google — okrągły, klej z tyłu" },
          { src: "/products/krazek-2.webp", alt: "Krążek opinii Google — wymiary" },
          { src: "/products/krazek-3.webp", alt: "Krążek opinii Google — wystawianie opinii w telefonie" },
        ],
      },
      {
        id: "mix",
        label: "Zestaw mix",
        blurb: "Stojak + naklejka + krążek",
        basePrice: 149,
        gallery: [
          { src: "/products/stojak-1.webp", alt: "Zestaw mix — stojak na opinie Google" },
          { src: "/products/naklejka-1.webp", alt: "Zestaw mix — naklejka opinii Google" },
          { src: "/products/krazek-1.webp", alt: "Zestaw mix — krążek opinii Google" },
        ],
      },
    ],
    quantities: [
      { qty: 2, label: "2 szt", discount: 0 },
      { qty: 3, label: "3 szt", discount: 0.15, badge: "Najpopularniejsze" },
      { qty: 5, label: "5 szt", discount: 0.25 },
    ],
    trust: [
      { icon: "truck", label: "Wysyłka następnego dnia" },
      { icon: "shield", label: "Wyprodukowano w PL" },
    ],
    accordions: [
      {
        title: "Opis",
        body: "Wizytówka, dzięki której klient zostawia opinię w Google jednym dotknięciem telefonu (NFC) lub skanem kodu QR. Bez aplikacji, bez logowania, bez proszenia — działa na iPhone i Androidzie.",
      },
      {
        title: "Szczegóły",
        body: "Materiał: akryl / PVC. Konfiguracja pod Twój profil firmy w Google. NFC + kod QR prowadzą prosto do okna wystawienia opinii.",
      },
      {
        title: "Co w zestawie",
        body: "Wizytówka opinii Google w wybranym formacie, gotowa do użycia od ręki. Naklejki i krążki z taśmą samoprzylepną na spodzie.",
      },
    ],
    marquee: [
      "NFC + QR",
      "Bez aplikacji",
      "iPhone i Android",
      "Wysyłka następnego dnia",
      "Więcej opinii w Google",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import {
  computePricing,
  formatPrice,
  type Product,
} from "@/app/data/products";
import Icon from "./Icon";
import RatingStars from "./RatingStars";
import ProductGallery from "./ProductGallery";
import FormatSelector from "./FormatSelector";
import QuantitySelector from "./QuantitySelector";
import Accordion from "./Accordion";
import LoadingScreen from "../layout/LoadingScreen";

type Props = {
  product: Product;
};

export default function ProductPage({ product }: Props) {
  const [formatId, setFormatId] = useState(product.formats[0].id);
  const [qty, setQty] = useState(
    product.quantities.find((q) => q.badge)?.qty ?? product.quantities[0].qty,
  );
  const [added, setAdded] = useState(false);

  const format = useMemo(
    () => product.formats.find((f) => f.id === formatId) ?? product.formats[0],
    [product.formats, formatId],
  );
  const tier = useMemo(
    () => product.quantities.find((q) => q.qty === qty) ?? product.quantities[0],
    [product.quantities, qty],
  );
  const { price, compareAt, savePct } = computePricing(format, tier);

  const handleAdd = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <LoadingScreen fadeAt={1100} removeAt={1600} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
      {/* galeria */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductGallery key={format.id} images={format.gallery} />
      </div>

      {/* informacje */}
      <div className="flex flex-col gap-5">
        <RatingStars value={product.rating.value} count={product.rating.count} />

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
          {product.name}
        </h1>

        {/* cechy */}
        <ul className="grid grid-cols-2 gap-3">
          {product.features.map((f) => (
            <li key={f.label} className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-700">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-zinc-700">{f.label}</span>
            </li>
          ))}
        </ul>

        <FormatSelector
          formats={product.formats}
          selectedId={formatId}
          onSelect={setFormatId}
        />

        <QuantitySelector
          format={format}
          quantities={product.quantities}
          selectedQty={qty}
          onSelect={setQty}
        />

        {/* cena */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-zinc-900">{formatPrice(price)}</span>
          {savePct > 0 && (
            <>
              <span className="text-lg text-zinc-400 line-through">{formatPrice(compareAt)}</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                -{savePct}%
              </span>
            </>
          )}
        </div>

        {/* dodaj do koszyka (wizualnie) */}
        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
        >
          {added ? (
            <>
              <Check className="h-5 w-5" /> Dodano
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" /> Dodaj do koszyka
            </>
          )}
        </button>

        {/* plakietki zaufania */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-600">
          {product.trust.map((t) => (
            <span key={t.label} className="flex items-center gap-1.5">
              <Icon name={t.icon} className="h-4 w-4 text-blue-600" />
              {t.label}
            </span>
          ))}
        </div>

        <Accordion items={product.accordions} />
      </div>
    </div>
    </>
  );
}

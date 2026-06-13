import { notFound } from "next/navigation";
import ProductPage from "@/app/components/product/ProductPage";
import Marquee from "@/app/components/layout/Marquee";
import { getProductBySlug, products } from "@/app/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — Scanova` : "Produkt — Scanova" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductPage product={product} />
      <Marquee items={product.marquee} />
    </>
  );
}

import type { Metadata } from "next";
import { ProductGrid } from "./ProductGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Monochrome essentials for on and off court.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">Shop</h1>
      <div className="max-w-[72ch] space-y-6 md:space-y-8">
        <p>Monochrome essentials for on and off court.</p>
      </div>
      <ProductGrid />
      <p className="text-sm text-white/70">Clean lines. No loud logos. Built to last.</p>
    </div>
  );
}

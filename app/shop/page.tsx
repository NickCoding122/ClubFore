import Link from "next/link";
import { Section } from "@/components/Section";

export default function ShopPage() {
  return (
    <Section className="max-w-3xl py-24 space-y-8">
      <h1 className="text-4xl font-bold">Club Fore Apparel</h1>
      <p>Monochrome essentials for on and off court.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>CF Logo Tee — Black / White</div>
        <div>Performance Hoodie — Black</div>
        <div>Court Cap — Black</div>
        <div>Minimal Tote — Natural / Black</div>
        <div>Warm-Up Crew — Black</div>
        <div>Training Shorts — Black</div>
      </div>
      <p className="text-sm opacity-60">Clean lines. No loud logos. Built to last.</p>
      <Link href="/products" className="inline-block px-6 py-3 rounded-2xl bg-white text-black">Enter Shop</Link>
    </Section>
  );
}

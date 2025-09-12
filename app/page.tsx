import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  description: "Precision. Power. Minimalism.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function Home() {
  return (
    <>
      <Hero />
      <section id="main" className="px-6 md:px-10 py-24 max-w-[72ch] mx-auto space-y-8">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Precision. Power. Minimalism.</h2>
        <p className="text-white/70 leading-relaxed">
          A club experience engineered for focus. Membership is limited.
        </p>
        <div className="flex gap-4">
          <Link
            href="/membership"
            className="no-underline inline-flex items-center rounded-2xl bg-white text-black px-6 py-3 font-medium hover:opacity-90 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
          >
            Membership
          </Link>
          <Link
            href="/shop"
            className="no-underline rounded-2xl border border-white/30 px-6 py-3 text-white hover:border-white/60 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
          >
            Shop
          </Link>
        </div>
      </section>
    </>
  );
}


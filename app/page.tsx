import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Precision. Power. Minimalism.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function Home() {
  return (
    <div className="min-h-[88vh] md:min-h-screen grid place-items-center px-4">
      <div className="text-center space-y-8 md:space-y-10">
        <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">CLUB FORE</h1>
        <p className="text-sm md:text-base text-white/70">Precision. Power. Minimalism.</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/membership"
            className="inline-flex items-center rounded-2xl bg-white text-black px-6 py-3 font-medium hover:opacity-90 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
          >
            Membership
          </Link>
          <Link
            href="/shop"
            className="rounded-2xl border border-white/30 px-6 py-3 text-white hover:border-white/60 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
          >
            Shop
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-white/50 tracking-wide">
          <span>Control</span>
          <span>·</span>
          <span>Balance</span>
          <span>·</span>
          <span>Longevity</span>
        </div>
      </div>
    </div>
  );
}

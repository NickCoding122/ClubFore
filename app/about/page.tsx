import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Minimalist padel gear designed in London, played everywhere.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 space-y-6">
      <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">About Club Fore</h1>
      <div className="max-w-[72ch] space-y-6 md:space-y-8">
        <p>We strip everything back to what matters: feel, balance, longevity.</p>
        <p>Every product starts on court and ends in your hand.</p>
      </div>
      <p className="text-white/60">Designed in London. Played everywhere.</p>
    </div>
  );
}

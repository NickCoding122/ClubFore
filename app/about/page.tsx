import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Courtier was founded on a simple idea: padel deserves a setting as inspiring as the sport itself.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function AboutPage() {
  return (
    <div id="main" className="max-w-2xl mx-auto px-4 py-24 space-y-6">
      <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">About Us</h1>
      <div className="max-w-[72ch] space-y-6 md:space-y-8">
        <p>
          Courtier was founded on a simple idea: padel deserves a setting as inspiring as the
          sport itself. Our clubs are designed with clarity, balance, and detail in mind — courts
          that play beautifully, atmospheres that feel effortless, and a culture built around the joy
          of play.
        </p>
        <p>
          Padel is more than competition. It’s connection, rhythm, and energy shared. Courtier is
          where that spirit comes to life.
        </p>
      </div>
    </div>
  );
}

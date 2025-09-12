import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  description: "Precision. Power. Minimalism.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
    </main>
  );
}


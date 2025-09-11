import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Club Fore.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 space-y-6">
      <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">Contact</h1>
      <div className="max-w-[72ch] space-y-6 md:space-y-8">
        <p>Contact page coming soon.</p>
      </div>
    </div>
  );
}

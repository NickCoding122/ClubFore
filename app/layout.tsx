import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Courtier", template: "%s · Courtier" },
  description: "Precision. Power. Minimalism.",
  openGraph: { title: "Courtier", description: "Precision. Power. Minimalism.", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/twitter-image"] }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only fixed top-3 left-3 bg-white text-black rounded px-3 py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

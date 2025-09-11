import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Club Fore", template: "%s · Club Fore" },
  description: "Precision meets power. Sleek padel gear by Club Fore.",
  openGraph: { title: "Club Fore", description: "Precision meets power.", images: ["/og.jpg"] }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Courtier",
  description: "Members-only padel. Designed in London.",
};

export default function Page() {
  return (
    <main className="bg-black text-white">
      <Hero />
    </main>
  );
}

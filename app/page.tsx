import type { Metadata } from "next";
import HeroCourt from "@/components/HeroCourt";

export const metadata: Metadata = {
  title: "Club Fore",
  description: "Members-only padel. Designed in London.",
};

export default function Page() {
  return (
    <main className="bg-black text-white">
      <HeroCourt />
    </main>
  );
}

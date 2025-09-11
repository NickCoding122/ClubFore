import Link from "next/link";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <Section className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-6xl md:text-8xl font-bold">CLUB FORE</h1>
      <p className="text-lg opacity-80">Precision. Power. Minimalism.</p>
      <div className="flex gap-4">
        <Link href="/membership" className="px-6 py-3 rounded-2xl bg-white text-black">Membership</Link>
        <Link href="/shop" className="px-6 py-3 rounded-2xl border border-white bg-transparent">Shop</Link>
      </div>
      <div className="mt-16 flex items-center gap-2 text-xs opacity-50">
        <span>Control</span>
        <span>·</span>
        <span>Balance</span>
        <span>·</span>
        <span>Longevity</span>
      </div>
    </Section>
  );
}

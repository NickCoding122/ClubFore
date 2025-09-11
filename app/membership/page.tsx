import Link from "next/link";
import { Section } from "@/components/Section";

export default function MembershipPage() {
  return (
    <Section className="max-w-2xl py-24 space-y-8">
      <h1 className="text-4xl font-bold">Membership at Club Fore</h1>
      <p>A private network for players who value focus over noise.</p>
      <div className="divide-y divide-white/10">
        <div className="py-6">
          <h2 className="font-semibold">Standard</h2>
          <p className="opacity-80">Priority booking, member rates.</p>
        </div>
        <div className="py-6">
          <h2 className="font-semibold">Premium</h2>
          <p className="opacity-80">Extended access, guest passes, event invites.</p>
        </div>
        <div className="py-6">
          <h2 className="font-semibold">Founders</h2>
          <p className="opacity-80">Lifetime perks, limited availability.</p>
        </div>
      </div>
      <p className="text-sm opacity-60">Spaces are limited. Applications reviewed weekly.</p>
      <Link href="/contact" className="inline-block px-6 py-3 rounded-2xl bg-white text-black">Apply for Membership</Link>
    </Section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ApplyButton } from "./ApplyButton";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join a private network for players who value focus over noise.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function MembershipPage() {
  return (
    <div id="main" className="max-w-4xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">Membership at Club Fore</h1>
      <div className="max-w-[72ch] space-y-6 md:space-y-8">
        <p>A private network for players who value focus over noise.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold">Standard</div>
          <p className="text-sm text-white/70">Priority booking, member rates.</p>
        </div>
        <div>
          <div className="font-semibold">Premium</div>
          <p className="text-sm text-white/70">Extended access, guest passes, event invites.</p>
        </div>
        <div>
          <div className="font-semibold">Founders</div>
          <p className="text-sm text-white/70">Lifetime perks, limited availability.</p>
        </div>
      </div>
      <p className="text-sm text-white/70">Spaces are limited. Applications reviewed weekly.</p>
      <div className="border-t border-white/10 mt-12 pt-8 space-y-4">
        <ApplyButton />
        <Link href="/contact?reason=membership" className="text-sm focus:outline-white/60">
          Use contact form instead
        </Link>
      </div>
    </div>
  );
}

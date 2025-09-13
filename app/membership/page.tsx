import type { Metadata } from "next";
import Link from "next/link";
import { ApplyButton } from "./ApplyButton";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership at Club Fore is designed to fit how you play, with three tiers balancing access, flexibility, and community.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

export default function MembershipPage() {
  return (
    <div id="main" className="max-w-4xl mx-auto px-4 py-24 space-y-8">
      <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">Membership</h1>
      <div className="max-w-[72ch] space-y-6 md:space-y-8">
        <p>
          Membership at Club Fore is designed to fit how you play, with three tiers balancing access,
          flexibility, and community.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold">Core — £95/month</div>
          <p className="text-sm text-white/70">
            Straightforward access with priority booking (off-peak + selected peak), member
            matchplay evenings, coaching eligibility, and member-rate merchandise.
          </p>
        </div>
        <div>
          <div className="font-semibold">Plus — £150/month</div>
          <p className="text-sm text-white/70">
            Full flexibility with priority booking at all times, seasonal events, two monthly guest
            passes, coaching discounts, and early access to new products.
          </p>
        </div>
        <div>
          <div className="font-semibold">Premier — £250/month</div>
          <p className="text-sm text-white/70">
            The complete experience: unlimited priority booking, quarterly coaching consultations,
            exclusive events, four monthly guest passes, first access to collaborations, and concierge
            support.
          </p>
        </div>
      </div>
      <p className="text-sm text-white/70">Annual membership is available at preferential rates.</p>
      <div className="border-t border-white/10 mt-12 pt-8 space-y-4">
        <ApplyButton />
        <Link href="/contact?reason=membership" className="text-sm focus:outline-white/60">
          Use contact form instead
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import type { SVGProps } from "react";
import Link from "next/link";
import { ApplyButton } from "./ApplyButton";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Core",
    price: "£95/month",
    description:
      "Straightforward access with priority booking (off-peak + selected peak), member matchplay evenings, coaching eligibility, and member-rate merchandise.",
    features: [
      "Priority off-peak booking",
      "Matchplay evenings",
      "Coaching eligibility",
      "Member-rate merchandise"
    ]
  },
  {
    name: "Plus",
    price: "£150/month",
    description:
      "Full flexibility with priority booking at all times, seasonal events, two monthly guest passes, coaching discounts, and early access to new products.",
    features: [
      "All-hours priority booking",
      "Seasonal events",
      "2 guest passes each month",
      "Coaching discounts",
      "Early access to products"
    ],
    highlighted: true
  },
  {
    name: "Premier",
    price: "£250/month",
    description:
      "The complete experience: unlimited priority booking, quarterly coaching consultations, exclusive events, four monthly guest passes, first access to collaborations, and concierge support.",
    features: [
      "Unlimited priority booking",
      "Quarterly coaching consultations",
      "Exclusive events",
      "4 guest passes each month",
      "First access to collaborations",
      "Concierge support"
    ]
  }
];

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Membership at Club Fore is designed to fit how you play, with three tiers balancing access, flexibility, and community.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { images: ["/twitter-image"] }
};

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 10l3 3 7-7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MembershipPage() {
  return (
    <div id="main" className="max-w-5xl mx-auto px-4 py-32 space-y-24">
      <header className="text-center space-y-6">
        <h1 className="text-6xl md:text-7xl tracking-tight leading-[0.95]">
          Membership
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-white/80">
          Membership at Club Fore is designed to fit how you play, with three tiers
          balancing access, flexibility, and community.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border border-white/15 p-6 backdrop-blur bg-white/5 ${
              plan.highlighted ? "ring-2 ring-white/30" : ""
            }`}
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="text-sm text-white/60">{plan.price}</p>
            </div>
            <p className="text-sm text-white/70 flex-1">{plan.description}</p>
            <ul className="mt-6 space-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start text-sm text-white/70"
                >
                  <CheckIcon className="h-5 w-5 flex-none text-white mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="space-y-6 text-center">
        <p className="text-sm text-white/70">
          Annual membership is available at preferential rates.
        </p>
        <div className="space-y-2">
          <ApplyButton />
          <Link
            href="/contact?reason=membership"
            className="block text-sm text-white/70 hover:text-white focus:outline-white/60"
          >
            Use contact form instead
          </Link>
        </div>
      </section>
    </div>
  );
}


import { Section } from "@/components/Section";

export default function AboutPage() {
  return (
    <Section className="max-w-2xl py-24 space-y-8">
      <h1 className="text-4xl font-bold">About Club Fore</h1>
      <p>
        We strip everything back to what matters: feel, balance, longevity.<br />
        Quiet design. Clear intent.
      </p>
      <p>
        Every product starts on court and ends in your hand.<br />
        No extras. Only what works.
      </p>
      <p className="text-sm opacity-60">Designed in London. Played everywhere.</p>
    </Section>
  );
}

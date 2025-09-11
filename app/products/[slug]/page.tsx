import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

import { Section } from "@/components/Section";

export default function ProductPage({ params }: ProductPageProps) {
  if (!params.slug) {
    notFound();
  }

  return (
    <Section className="max-w-2xl">
      Product <strong>{params.slug}</strong> coming soon.
    </Section>
  );
}

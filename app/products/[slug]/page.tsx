import { notFound } from "next/navigation";
import { Section } from "@/components/Section";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  if (!params.slug) {
    notFound();
  }

  return (
    <Section>
      Product <strong>{params.slug}</strong> coming soon.
    </Section>
  );
}

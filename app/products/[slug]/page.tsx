import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  if (!params.slug) {
    notFound();
  }

  return (
    <div className="p-4">
      Product <strong>{params.slug}</strong> coming soon.
    </div>
  );
}

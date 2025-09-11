import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/Section";
import products from "@/data/products.json";

export default function Home() {
  const highlights = products.slice(0, 3);
  return (
    <>
      <Section className="py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Precision meets power.</h1>
            <p className="mt-4 text-lg opacity-80">
              Sleek padel gear engineered for control and built to last.
            </p>
            <div className="mt-8 flex gap-3">
              <Link className="px-5 py-3 bg-black text-white rounded-2xl border" href="/products">Shop Paddles</Link>
              <Link className="px-5 py-3 border rounded-2xl" href="/contact">Contact</Link>
            </div>
          </div>
          <div className="border rounded-2xl p-6 bg-white">
            <Image src="/logo.svg" width={800} height={400} alt="Club Fore wordmark" className="w-full h-auto" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Control", text: "Balanced frames for surgical placement." },
            { title: "Vibration dampening", text: "Composite layups reduce arm fatigue." },
            { title: "Sustainable build", text: "Durable materials for a longer lifecycle." }
          ].map((f) => (
            <div key={f.title} className="border rounded-2xl p-6">
              <h3 className="font-medium">{f.title}</h3>
              <p className="opacity-70 text-sm mt-2">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-semibold">Highlights</h2>
          <Link href="/products" className="text-sm underline">View all</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="border rounded-2xl p-4 hover:opacity-80">
              <Image src={p.images[0]} alt={p.name} width={600} height={400} className="w-full h-auto rounded-xl border" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm opacity-70">{p.specs.surface}</div>
                </div>
                <div className="text-sm font-semibold">£{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

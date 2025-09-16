"use client";
import { useState } from "react";
import Image from "next/image";
import products from "@/data/products.json";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export function ProductGrid() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    const res = await fetch(`/api/contact?reason=merch&productId=${selected.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form })
    });
    if (res.ok) setSent(true);
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p: Product) => (
          <button
            key={p.id}
            onClick={() => {
              setSelected(p);
              setSent(false);
            }}
            className="text-left border border-white/10 rounded-xl overflow-hidden transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20 focus:outline-white/60"
          >
            <Image
              src={p.images[0]}
              alt={p.name}
              width={400}
              height={400}
              className="w-full h-48 object-cover bg-neutral-950"
            />
              <div className="p-4">
                <div className="text-sm uppercase tracking-wide text-white/80">{p.name}</div>
                <div className="text-sm text-white/60 mt-1">£{p.price}</div>
              </div>
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-4xl bg-neutral-950 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected.images[0]}
              alt={selected.name}
              width={600}
              height={600}
              className="w-full md:w-1/2 h-auto object-contain bg-neutral-900 rounded-xl"
            />
            <form onSubmit={submit} className="flex-1 flex flex-col space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Register Interest</h2>
                <p className="text-sm text-white/70">{selected.name} – £{selected.price}</p>
                <p className="text-sm text-white/70 mt-2">{selected.description}</p>
              </div>
              <input
                type="text"
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl bg-neutral-950 border border-white/20 text-white placeholder-white/40 px-3 py-2 focus:outline-white/60"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl bg-neutral-950 border border-white/20 text-white placeholder-white/40 px-3 py-2 focus:outline-white/60"
              />
              {sent ? (
                <p className="text-sm">Thanks — we\u2019ll be in touch.</p>
              ) : (
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="rounded-2xl border border-white/30 px-6 py-3 text-white hover:border-white/60 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-2xl bg-white text-black px-6 py-3 font-medium hover:opacity-90 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
                  >
                    Send
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

"use client";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, reason: "newsletter", name: "Newsletter", hp: "" })
    });
    if (res.ok) setSent(true);
  }
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-white">
        <p className="text-sm">Designed in London. Played everywhere.</p>
        {sent ? (
          <p className="text-sm">Thanks — you’re on the list.</p>
        ) : (
          <form onSubmit={submit} className="flex gap-2">
            <input
              type="email"
              required
              aria-label="Email for newsletter"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl bg-neutral-950 border border-white/20 text-white placeholder-white/40 px-3 py-2 focus:outline-white/60"
            />
            <button className="inline-flex items-center rounded-2xl bg-white text-black px-6 py-3 font-medium hover:opacity-90 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </footer>
  );
}

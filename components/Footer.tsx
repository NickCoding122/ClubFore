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
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-2 items-center text-white">
        <div>
          <div className="font-semibold">Club Fore</div>
          <p className="text-sm opacity-70">Precision meets power.</p>
        </div>
        <form onSubmit={submit} className="flex gap-2">
          <input
            type="email"
            required
            aria-label="Email for newsletter"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-2xl px-3 py-2 bg-neutral-950 text-white border border-white/20 placeholder-white/40"
          />
          <button className="rounded-2xl px-5 py-3 bg-white text-black hover:ring-2 hover:ring-white/20">
            Subscribe
          </button>
        </form>
        {sent && <p className="text-sm">Thanks — you’re on the list.</p>}
        <div className="text-sm mt-4 flex gap-4">
          <a href="/privacy" className="hover:opacity-80">
            Privacy
          </a>
          <a href="/terms" className="hover:opacity-80">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";
import { useState } from "react";

export function ApplyButton() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", note: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, reason: "membership" })
    });
    if (res.ok) setSent(true);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-2xl bg-white text-black px-6 py-3 font-medium hover:opacity-90 focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
      >
        Apply for Membership
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4">
          <form
            onSubmit={submit}
            className="w-full max-w-md space-y-4 bg-neutral-950 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold">Membership Application</h2>
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
            <textarea
              placeholder="Short note"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full rounded-2xl bg-neutral-950 border border-white/20 text-white placeholder-white/40 px-3 py-2 focus:outline-white/60"
            />
            {sent ? (
              <p className="text-sm">Thanks — we\u2019ll be in touch.</p>
            ) : (
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
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
      )}
    </>
  );
}

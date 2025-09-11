"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-white">
        <Link href="/" className="font-semibold tracking-widest text-xl focus:outline-white/60">
          CLUB FORE
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/membership" className="focus:outline-white/60">
            Membership
          </Link>
          <Link href="/shop" className="focus:outline-white/60">
            Shop
          </Link>
          <Link href="/about" className="focus:outline-white/60">
            About
          </Link>
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden px-3 py-2 border border-white/30 rounded-2xl focus:outline-white/60 transition-transform duration-150 will-change-transform hover:-translate-y-0.5 hover:ring-1 hover:ring-white/20"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-black text-white divide-y divide-white/10">
          <Link
            href="/membership"
            className="block px-4 py-4 focus:outline-white/60"
            onClick={() => setOpen(false)}
          >
            Membership
          </Link>
          <Link
            href="/shop"
            className="block px-4 py-4 focus:outline-white/60"
            onClick={() => setOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="block px-4 py-4 focus:outline-white/60"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}

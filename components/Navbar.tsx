"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-black/60 border-b border-white/10 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between text-white">
        <Link href="/" className="font-semibold tracking-widest text-xl">CLUB FORE</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/products" className="hover:opacity-80">Products</Link>
          <Link href="/about" className="hover:opacity-80">About</Link>
          <Link href="/contact" className="hover:opacity-80">Contact</Link>
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden p-2 border border-white/30 rounded hover:ring-2 hover:ring-white/20"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black text-white">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-2">
            <Link href="/products" className="hover:opacity-80" onClick={() => setOpen(false)}>
              Products
            </Link>
            <Link href="/about" className="hover:opacity-80" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="hover:opacity-80" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

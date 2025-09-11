"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 border-b backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-widest text-xl">CLUB FORE</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/products" className="hover:opacity-70">Products</Link>
          <Link href="/about" className="hover:opacity-70">About</Link>
          <Link href="/contact" className="hover:opacity-70">Contact</Link>
        </nav>
        <button
          aria-label="Menu"
          className="md:hidden p-2 border rounded"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-2">
            <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}

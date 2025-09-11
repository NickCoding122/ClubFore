import React from "react";

export function Section({
  children,
  className = "",
  surface = false,
}: {
  children: React.ReactNode;
  className?: string;
  surface?: boolean;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-16 ${className}`}>
      {surface ? (
        <div className="rounded-2xl bg-neutral-950 border border-white/10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`mx-auto max-w-6xl px-4 py-16 rounded-2xl bg-white text-black border border-black/10 shadow ${className}`}
    >
      {children}
    </section>
  );
}

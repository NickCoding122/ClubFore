"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1.2, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const logoY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-40%"]);

  const courtOpacity = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  const courtScale = useTransform(scrollYProgress, [0.3, 0.8], [0.9, 1]);
  const courtY = useTransform(scrollYProgress, [0.3, 0.8], ["20%", "0%"]);
  const dash = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);

  const imageOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.h1
          style={{ scale: logoScale, opacity: logoOpacity, y: logoY }}
          className="text-6xl md:text-7xl tracking-tight"
        >
          CLUB FORE
        </motion.h1>

        <motion.div
          style={{ opacity: courtOpacity, scale: courtScale, y: courtY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <WireframeCourt progress={dash} />
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%)," +
                "repeating-linear-gradient(rgba(255,255,255,0.05) 0 1px, transparent 1px 40px)," +
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 40px)",
            }}
          />
        </motion.div>

        <motion.div
          style={{
            opacity: imageOpacity,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1555169062-013468b477d0?auto=format&fit=crop&w=1200&q=80)",
          }}
          className="absolute inset-0 bg-center bg-cover"
        />
      </div>
    </section>
  );
}

function WireframeCourt({ progress }: { progress: MotionValue<number> }) {
  return (
    <motion.svg
      viewBox="0 0 1000 640"
      className="w-full max-w-5xl text-white"
      style={{ "--dash": progress } as any}
    >
      <rect
        x="80"
        y="60"
        width="840"
        height="520"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="[stroke-dasharray:1600] [stroke-dashoffset:calc(1600*var(--dash))]"
      />
      <line
        x1="500"
        y1="60"
        x2="500"
        y2="580"
        stroke="currentColor"
        strokeWidth="2"
        className="[stroke-dasharray:1040] [stroke-dashoffset:calc(1040*var(--dash))]"
      />
      <line
        x1="80"
        y1="320"
        x2="920"
        y2="320"
        stroke="currentColor"
        strokeWidth="2"
        className="[stroke-dasharray:840] [stroke-dashoffset:calc(840*var(--dash))]"
      />
    </motion.svg>
  );
}


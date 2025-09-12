"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll segments
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.72]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 0.55, 0]);
  const logoY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const lightsDash = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]);
  const netDash = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);
  const linesDash = useTransform(scrollYProgress, [0.6, 1.0], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 85%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
        {/* Grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),` +
              `linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "48px 48px, 48px 48px",
          }}
        />
        {/* Content */}
        <div className="relative z-10 grid h-full place-items-center">
          <motion.h1
            style={{ scale: logoScale, opacity: logoOpacity, y: logoY }}
            className="select-none text-[clamp(56px,12vw,160px)] font-extrabold tracking-tight leading-[0.9] [will-change:transform]"
          >
            CLUB FORE
          </motion.h1>
          <SceneSVG lightsDash={lightsDash} netDash={netDash} linesDash={linesDash} />
        </div>
      </div>
    </section>
  );
}

function SceneSVG({
  lightsDash,
  netDash,
  linesDash,
}: {
  lightsDash: MotionValue<number>;
  netDash: MotionValue<number>;
  linesDash: MotionValue<number>;
}) {
  const VP = { x: 500, y: 190 };
  return (
    <motion.svg
      viewBox="0 0 1000 640"
      className="absolute inset-0 m-auto max-w-[96vw] max-h-[80vh]"
      style={{
        "--dashLights": lightsDash,
        "--dashNet": netDash,
        "--dashLines": linesDash,
      } as any}
      aria-hidden
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Overhead lights */}
      <g filter="url(#glow)">
        <motion.line
          x1={260}
          y1={-40}
          x2={240}
          y2={VP.y}
          stroke="white"
          strokeWidth={4}
          className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLights))]"
          strokeLinecap="round"
        />
        <motion.line
          x1={740}
          y1={-40}
          x2={760}
          y2={VP.y}
          stroke="white"
          strokeWidth={4}
          className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLights))]"
          strokeLinecap="round"
        />
      </g>
      {/* Net */}
      <motion.line
        x1={140}
        y1={400}
        x2={860}
        y2={390}
        stroke="white"
        strokeWidth={2.5}
        className="[stroke-dasharray:800] [stroke-dashoffset:calc(800*var(--dashNet))]"
      />
      {/* Court lines */}
      <motion.line
        x1={VP.x}
        y1={VP.y + 40}
        x2={VP.x}
        y2={620}
        stroke="white"
        strokeWidth={3}
        className="[stroke-dasharray:460] [stroke-dashoffset:calc(460*var(--dashLines))]"
      />
      <motion.line
        x1={200}
        y1={VP.y + 50}
        x2={100}
        y2={620}
        stroke="white"
        strokeWidth={2.5}
        className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLines))]"
      />
      <motion.line
        x1={800}
        y1={VP.y + 50}
        x2={900}
        y2={620}
        stroke="white"
        strokeWidth={2.5}
        className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLines))]"
      />
      <motion.line
        x1={180}
        y1={VP.y + 40}
        x2={820}
        y2={VP.y + 40}
        stroke="white"
        strokeWidth={1.5}
        className="[stroke-dasharray:640] [stroke-dashoffset:calc(640*var(--dashLines))]"
      />
    </motion.svg>
  );
}


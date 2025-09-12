"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

/**
 * Cinematic, single-viewport hero:
 * - Logo fades "into" the back wall
 * - Two angled ceiling light strips descend
 * - Court lines draw in with perspective to a vanishing point
 * - No below-the-fold content; scroll only drives animation
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 200vh scrub range
  });

  // TIMING MAP (tweakable):
  // 0.00–0.30  Logo recede/fade
  // 0.30–0.55  Lights draw down
  // 0.50–0.65  Net + back-wall line
  // 0.60–1.00  Remaining court lines

  // Logo transforms
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.72]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 0.55, 0]);
  const logoY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  // Light strips draw (0 -> 1)
  const lightDraw = useTransform(scrollYProgress, [0.3, 0.55], [1, 0]); // dashoffset multiplier

  // Lines draw windows
  const netDraw   = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);
  const linesDraw = useTransform(scrollYProgress, [0.6, 1.0], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Digital room vignette (pure CSS) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 85%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
        {/* Subtle grid for structure */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "48px 48px, 48px 48px",
          }}
        />

        {/* Center stack */}
        <div className="relative z-10 grid place-items-center h-full">
          {/* LOGO */}
          <motion.h1
            style={{ scale: logoScale, opacity: logoOpacity, y: logoY }}
            className="select-none text-[clamp(56px,12vw,160px)] font-extrabold tracking-tight leading-[0.9] will-change-transform"
          >
            CLUB FORE
          </motion.h1>

          {/* SVG SCENE */}
          <SceneSVG
            lightDraw={lightDraw}
            netDraw={netDraw}
            linesDraw={linesDraw}
          />
        </div>
      </div>
    </section>
  );
}

function SceneSVG({
  lightDraw,
  netDraw,
  linesDraw,
}: {
  lightDraw: MotionValue<number>;
  netDraw: MotionValue<number>;
  linesDraw: MotionValue<number>;
}) {
  // Vanishing point tuned to match the reference render
  const VP = { x: 500, y: 190 };

  return (
    <motion.svg
      viewBox="0 0 1000 640"
      className="absolute inset-0 m-auto max-w-[96vw] max-h-[80vh]"
      // Bind dash variables to MotionValues for all paths
      style={
        {
          // @ts-ignore custom props
          "--dashLights": lightDraw,
          "--dashNet": netDraw,
          "--dashLines": linesDraw,
        } as any
      }
      aria-hidden
    >
      <Defs />

      {/* CEILING LIGHT STRIPS (angled, receding) */}
      <g filter="url(#glow)">
        {/* Left strip: from ceiling to near vanishing layer */}
        <motion.line
          x1={320}
          y1={-40}
          x2={300}
          y2={VP.y}
          stroke="white"
          strokeWidth={6}
          className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLights))]"
          strokeLinecap="round"
        />
        {/* Right strip */}
        <motion.line
          x1={680}
          y1={-40}
          x2={700}
          y2={VP.y}
          stroke="white"
          strokeWidth={6}
          className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLights))]"
          strokeLinecap="round"
        />
      </g>

      {/* COURT LINES */}
      <g mask="url(#depth)" stroke="white">
        {/* Back-wall base line (thin, near VP) */}
        <motion.line
          x1={160}
          y1={VP.y + 40}
          x2={840}
          y2={VP.y + 40}
          strokeWidth={1.5}
          className="[stroke-dasharray:800] [stroke-dashoffset:calc(800*var(--dashLines))]"
        />

        {/* NET (slight perspective tilt) */}
        <motion.line
          x1={120}
          y1={380}
          x2={880}
          y2={370}
          strokeWidth={2.5}
          className="[stroke-dasharray:820] [stroke-dashoffset:calc(820*var(--dashNet))]"
        />

        {/* CENTER LINE (from back wall toward camera) */}
        <motion.line
          x1={VP.x}
          y1={VP.y + 40}
          x2={VP.x}
          y2={620}
          strokeWidth={3}
          className="[stroke-dasharray:460] [stroke-dashoffset:calc(460*var(--dashLines))]"
        />

        {/* LEFT SIDELINE (converging) */}
        <motion.line
          x1={200}
          y1={VP.y + 50}
          x2={80}
          y2={620}
          strokeWidth={2.5}
          className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLines))]"
        />

        {/* RIGHT SIDELINE (converging) */}
        <motion.line
          x1={800}
          y1={VP.y + 50}
          x2={920}
          y2={620}
          strokeWidth={2.5}
          className="[stroke-dasharray:520] [stroke-dashoffset:calc(520*var(--dashLines))]"
        />
      </g>
    </motion.svg>
  );
}

/** SVG defs: depth mask + subtle glow for lights */
function Defs() {
  return (
    <defs>
      {/* Alpha mask: receding lines fade very slightly toward the top */}
      <mask id="depth">
        <linearGradient id="fadeY" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.65" />
          <stop offset="50%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <rect x="0" y="0" width="1000" height="640" fill="url(#fadeY)" />
      </mask>

      {/* Light glow (very restrained to keep it luxury/minimal) */}
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

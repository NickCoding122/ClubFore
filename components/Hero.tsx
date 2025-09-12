"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.4, 0]);

  const lightRange: [number, number] = [0.3, 0.5];
  const lightY = useTransform(scrollYProgress, lightRange, [-400, 0]);
  const lightOpacity = useTransform(scrollYProgress, lightRange, [0, 1]);

  const linesTrigger = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const linesControls = useAnimation();
  useEffect(() => {
    return linesTrigger.on("change", (latest) => {
      linesControls.start(latest > 0 ? "visible" : "hidden");
    });
  }, [linesTrigger, linesControls]);

  const groupVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 0.8 } },
  };

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <motion.h1
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="absolute text-[clamp(48px,12vw,160px)] font-extrabold"
        >
          CLUB FORE
        </motion.h1>

        <motion.svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full max-w-5xl mx-auto"
        >
          {/* Lights */}
          <motion.rect
            x="220"
            width="40"
            height="400"
            fill="currentColor"
            style={{
              y: lightY,
              opacity: lightOpacity,
              rotate: -10,
              originY: 0,
            }}
          />
          <motion.rect
            x="740"
            width="40"
            height="400"
            fill="currentColor"
            style={{
              y: lightY,
              opacity: lightOpacity,
              rotate: 10,
              originY: 0,
            }}
          />

          {/* Court lines */}
          <motion.g
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            variants={groupVariants}
            initial="hidden"
            animate={linesControls}
          >
            {/* Net line */}
            <motion.line
              x1="100"
              y1="320"
              x2="900"
              y2="280"
              strokeDasharray="1"
              variants={lineVariants}
            />
            {/* Center line */}
            <motion.line
              x1="500"
              y1="280"
              x2="500"
              y2="600"
              strokeDasharray="1"
              variants={lineVariants}
            />
            {/* Sidelines */}
            <motion.line
              x1="180"
              y1="600"
              x2="320"
              y2="280"
              strokeDasharray="1"
              variants={lineVariants}
            />
            <motion.line
              x1="820"
              y1="600"
              x2="680"
              y2="280"
              strokeDasharray="1"
              variants={lineVariants}
            />
          </motion.g>
        </motion.svg>

        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(800px 400px at 50% 80%, rgba(255,255,255,0.05), transparent 70%)",
          }}
        />
      </div>
    </section>
  );
}


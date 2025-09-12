"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Stage 1: logo fades and scales back
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.4, 0]);

  // Stage 2: overhead lights
  const light1 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const light2 = useTransform(scrollYProgress, [0.23, 0.43], [0, 1]);
  const light1Offset = useTransform(light1, [0, 1], [600, 0]);
  const light2Offset = useTransform(light2, [0, 1], [600, 0]);

  // Stage 3: net line
  const net = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const netOffset = useTransform(net, [0, 1], [800, 0]);

  // Stage 4: court lines sequential
  const linesTrigger = useTransform(scrollYProgress, [0.65, 0.66], [0, 1]);
  const linesControls = useAnimation();
  useEffect(() => {
    return linesTrigger.on("change", (latest) => {
      linesControls.start(latest > 0 ? "visible" : "hidden");
    });
  }, [linesControls, linesTrigger]);

  const groupVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: (length: number) => ({ strokeDashoffset: length }),
    visible: {
      strokeDashoffset: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <motion.h1
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="text-[clamp(48px,12vw,160px)] font-extrabold"
        >
          CLUB FORE
        </motion.h1>

        <motion.svg
          viewBox="0 0 1000 640"
          className="absolute inset-0 w-full max-w-5xl mx-auto"
        >
          {/* Overhead lights */}
          <motion.line
            x1="200"
            x2="800"
            y1="80"
            y2="80"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="600"
            style={{ strokeDashoffset: light1Offset }}
          />
          <motion.line
            x1="200"
            x2="800"
            y1="120"
            y2="120"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="600"
            style={{ strokeDashoffset: light2Offset }}
          />

          {/* Net line */}
          <motion.line
            x1="100"
            x2="900"
            y1="320"
            y2="320"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="800"
            style={{ strokeDashoffset: netOffset }}
          />

          {/* Court lines */}
          <motion.g
            variants={groupVariants}
            initial="hidden"
            animate={linesControls}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <motion.line
              x1="500"
              y1="60"
              x2="500"
              y2="580"
              strokeDasharray="520"
              variants={lineVariants}
              custom={520}
            />
            <motion.rect
              x="80"
              y="60"
              width="840"
              height="520"
              strokeDasharray="2720"
              variants={lineVariants}
              custom={2720}
            />
          </motion.g>
        </motion.svg>

        {/* Vignette + grid background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 70%)," +
              "repeating-linear-gradient(rgba(255,255,255,0.05) 0 1px, transparent 1px 40px)," +
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 40px)",
          }}
        />
      </div>
    </section>
  );
}


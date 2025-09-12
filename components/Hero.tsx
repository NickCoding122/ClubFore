"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Vec3 = { x: number; y: number; z: number };

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const camX = useTransform(scrollYProgress, [0, 1], [5, 20]);
  const logoScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.8, 0.6]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.7, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const lines: [Vec3, Vec3][] = [
      [{ x: -10, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }],
      [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 40 }],
      [{ x: -10, y: 0, z: 0 }, { x: -10, y: 0, z: 40 }],
      [{ x: 10, y: 0, z: 0 }, { x: 10, y: 0, z: 40 }],
    ];
    const net: [Vec3, Vec3] = [
      { x: -10, y: 0, z: 20 },
      { x: 10, y: 0, z: 20 },
    ];
    const lights: [Vec3, Vec3][] = [
      [{ x: -8, y: 8, z: -10 }, { x: -4, y: 8, z: 40 }],
      [{ x: 8, y: 8, z: -10 }, { x: 4, y: 8, z: 40 }],
    ];

    const project = (p: Vec3, cX: number) => {
      const f = 50;
      const scale = f / (p.z + cX);
      return {
        x: canvas.width / 2 + p.x * scale,
        y: canvas.height * 0.75 - p.y * scale,
      };
    };

    const drawSegment = (
      a: Vec3,
      b: Vec3,
      color: string,
      width: number,
      cX: number
    ) => {
      const pa = project(a, cX);
      const pb = project(b, cX);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    let frameId: number;

    const render = () => {
      const cX = camX.get();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.shadowColor = "rgba(255,255,255,0.3)";
      ctx.shadowBlur = 12;
      lights.forEach((seg) =>
        drawSegment(seg[0], seg[1], "rgba(200,200,200,0.8)", 6, cX)
      );
      ctx.restore();

      drawSegment(net[0], net[1], "#888", 3, cX);
      lines.forEach((seg) => drawSegment(seg[0], seg[1], "white", 2, cX));

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [camX]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="w-full h-full" />
        <motion.h1
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="absolute inset-0 flex items-center justify-center text-[clamp(56px,12vw,160px)] font-extrabold"
        >
          CLUB FORE
        </motion.h1>
      </div>
    </section>
  );
}


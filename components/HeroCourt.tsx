"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroCourt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pov, setPov] = useState(6.0);

  useEffect(() => {
    const COURT = {
      L: 20.0,
      W: 10.0,
      glassH: 3.0,
      backTotalH: 4.5,
      sideH: 3.5,
      sideCornerH: 4.0,
      cornerLen: 2.0,
      lineWidth: 0.05,
      serviceFromNet: 6.95,
      ceilingH: 6.0,
      net: { hCenter: 0.88, hPost: 0.92, postMax: 1.05 },
    };
    const CAM = { x: pov, y: 5.0, z: 1.7, f: 8.0 };

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr * 0.9);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", resize);
    resize();

    function project(
      p: { x: number; y: number; z: number },
      scale: number,
      cx: number,
      cy: number,
    ) {
      const dx = p.x - CAM.x;
      const dy = p.y - CAM.y;
      const dz = p.z - CAM.z;
      const EPS = 1e-3;
      const depth = Math.max(dx, EPS);
      const k = CAM.f / depth;
      return { x: cx + dy * k * scale, y: cy - dz * k * scale, depth };
    }

    function drawSegment(
      a: any,
      b: any,
      S: number,
      cx: number,
      cy: number,
      baseWidth = 2,
      style = "#fff",
    ) {
      const A = project(a, S, cx, cy);
      const B = project(b, S, cx, cy);
      if (A.depth <= 0 && B.depth <= 0) return;
      ctx.strokeStyle = style;
      ctx.lineWidth = baseWidth;
      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
    }

    function drawPolyline(
      points: any[],
      S: number,
      cx: number,
      cy: number,
      baseWidth = 2,
      style = "#fff",
    ) {
      if (!points.length) return;
      const P0 = project(points[0], S, cx, cy);
      if (P0.depth <= 0) return;
      ctx.strokeStyle = style;
      ctx.lineWidth = baseWidth;
      ctx.beginPath();
      ctx.moveTo(P0.x, P0.y);
      for (let i = 1; i < points.length; i++) {
        const Pi = project(points[i], S, cx, cy);
        if (Pi.depth <= 0) continue;
        ctx.lineTo(Pi.x, Pi.y);
      }
      ctx.stroke();
    }

    function build() {
      const g: any[] = [];
      const L = COURT.L,
        W = COURT.W;
      g.push([
        { x: 0, y: 0, z: 0 },
        { x: L, y: 0, z: 0 },
      ]);
      g.push([
        { x: L, y: 0, z: 0 },
        { x: L, y: W, z: 0 },
      ]);
      g.push([
        { x: L, y: W, z: 0 },
        { x: 0, y: W, z: 0 },
      ]);
      g.push([
        { x: 0, y: W, z: 0 },
        { x: 0, y: 0, z: 0 },
      ]);
      g.push([
        { x: L / 2, y: 0, z: 0 },
        { x: L / 2, y: 0, z: COURT.net.postMax },
      ]);
      g.push([
        { x: L / 2, y: W, z: 0 },
        { x: L / 2, y: W, z: COURT.net.postMax },
      ]);
      const netPts: any[] = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps,
          y = t * W;
        const h =
          COURT.net.hCenter +
          (COURT.net.hPost - COURT.net.hCenter) *
            Math.pow((y - W / 2) / (W / 2), 2);
        netPts.push({ x: L / 2, y, z: h });
      }
      const s1x = L / 2 - COURT.serviceFromNet,
        s2x = L / 2 + COURT.serviceFromNet;
      const lines = [
        [
          { x: 0, y: 0, z: 0 },
          { x: L, y: 0, z: 0 },
        ],
        [
          { x: 0, y: W, z: 0 },
          { x: L, y: W, z: 0 },
        ],
        [
          { x: s1x, y: 0, z: 0 },
          { x: s1x, y: W, z: 0 },
        ],
        [
          { x: s2x, y: 0, z: 0 },
          { x: s2x, y: W, z: 0 },
        ],
        [
          { x: s1x, y: W / 2, z: 0 },
          { x: L / 2, y: W / 2, z: 0 },
        ],
        [
          { x: L / 2, y: W / 2, z: 0 },
          { x: s2x, y: W / 2, z: 0 },
        ],
      ];
      const strips = [];
      for (let y = 3; y < W; y += 4) {
        strips.push([
          { x: 0, y: y, z: COURT.ceilingH },
          { x: L, y: y, z: COURT.ceilingH },
        ]);
      }
      return { segments: g, lines, netPts, strips };
    }
    const model = build();

    function draw() {
      const pad = 40,
        vw = window.innerWidth - pad * 2,
        vh = window.innerHeight - pad * 2;
      const S = Math.min(vw / (COURT.W * 1.1), vh / (COURT.ceilingH * 2.0));
      const cx = window.innerWidth / 2,
        cy = window.innerHeight * 0.75;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const seg of model.segments) drawSegment(seg[0], seg[1], S, cx, cy, 2);
      for (const seg of model.lines) drawSegment(seg[0], seg[1], S, cx, cy, 2, "#fff");
      const netRes = 20;
      for (let i = 0; i < netRes; i++) {
        const t = i / netRes,
          y = t * COURT.W;
        const h =
          COURT.net.hCenter +
          (COURT.net.hPost - COURT.net.hCenter) *
            Math.pow((y - COURT.W / 2) / (COURT.W / 2), 2);
        drawSegment(
          { x: COURT.L / 2, y, z: 0 },
          { x: COURT.L / 2, y, z: h },
          S,
          cx,
          cy,
          1,
          "#777",
        );
      }
      for (let j = 0; j < 8; j++) {
        const z = j * (COURT.net.hPost / 8);
        drawSegment(
          { x: COURT.L / 2, y: 0, z },
          { x: COURT.L / 2, y: COURT.W, z },
          S,
          cx,
          cy,
          1,
          "#777",
        );
      }
      drawPolyline(model.netPts, S, cx, cy, 2, "#fff");
      for (const strip of model.strips)
        drawSegment(strip[0], strip[1], S, cx, cy, 5, "#888");
    }

    let frame: number;
    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [pov]);

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white">
      <canvas ref={canvasRef} className="w-full flex-1 bg-black" />
      <div className="h-16 flex items-center justify-center bg-neutral-900 text-sm space-x-2">
        <span>POV (distance):</span>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={pov}
          onChange={(e) => setPov(parseFloat(e.target.value))}
          className="w-2/3"
        />
      </div>
    </div>
  );
}


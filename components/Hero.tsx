"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas-based padel court render.
 * Camera moves back as you scroll (no slider).
 */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Camera starts just in front of the near wall (x ≈ 25) so the logo fills the screen
    const CAM = { x: 25, y: 5.0, z: 1.7, f: 3.0 };

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

    // Scroll drives camera.x from ~25 (logo) back toward the court (~5)
    let scrollT = 0;
    function onScroll() {
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      scrollT = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      CAM.x = 25 - scrollT * 20; // from near wall (25) to ~5
    }
    window.addEventListener("scroll", onScroll);
    onScroll();

    function project(p: any, scale: number, cx: number, cy: number) {
      const dx = CAM.x - p.x,
        dy = p.y - CAM.y,
        dz = p.z - CAM.z;
      const depth = Math.max(dx, 1e-3);
      const k = CAM.f / depth;
      return { x: cx + dy * k * scale, y: cy - dz * k * scale, depth };
    }

    function drawSegment(
      a: any,
      b: any,
      S: number,
      cx: number,
      cy: number,
      w = 2,
      style = "#fff"
    ) {
      const A = project(a, S, cx, cy),
        B = project(b, S, cx, cy);
      if (A.depth <= 0 && B.depth <= 0) return;
      ctx.strokeStyle = style;
      ctx.lineWidth = w;
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
      w = 2,
      style = "#fff"
    ) {
      if (!points.length) return;
      const P0 = project(points[0], S, cx, cy);
      if (P0.depth <= 0) return;
      ctx.strokeStyle = style;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(P0.x, P0.y);
      for (let i = 1; i < points.length; i++) {
        const Pi = project(points[i], S, cx, cy);
        if (Pi.depth > 0) ctx.lineTo(Pi.x, Pi.y);
      }
      ctx.stroke();
    }

    function build() {
      const g: any[] = [];
      const L = COURT.L,
        W = COURT.W;
      g.push(
        [{ x: 0, y: 0, z: 0 }, { x: L, y: 0, z: 0 }],
        [{ x: L, y: 0, z: 0 }, { x: L, y: W, z: 0 }],
        [{ x: L, y: W, z: 0 }, { x: 0, y: W, z: 0 }],
        [{ x: 0, y: W, z: 0 }, { x: 0, y: 0, z: 0 }],
        [{ x: L / 2, y: 0, z: 0 }, { x: L / 2, y: 0, z: COURT.net.postMax }],
        [{ x: L / 2, y: W, z: 0 }, { x: L / 2, y: W, z: COURT.net.postMax }]
      );
      const netPts: any[] = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const y = t * W;
        const h =
          COURT.net.hCenter +
          (COURT.net.hPost - COURT.net.hCenter) * Math.pow((y - W / 2) / (W / 2), 2);
        netPts.push({ x: L / 2, y, z: h });
      }
      const s1x = L / 2 - COURT.serviceFromNet,
        s2x = L / 2 + COURT.serviceFromNet;
      const lines = [
        [{ x: 0, y: 0, z: 0 }, { x: L, y: 0, z: 0 }],
        [{ x: 0, y: W, z: 0 }, { x: L, y: W, z: 0 }],
        [{ x: s1x, y: 0, z: 0 }, { x: s1x, y: W, z: 0 }],
        [{ x: s2x, y: 0, z: 0 }, { x: s2x, y: W, z: 0 }],
        [{ x: s1x, y: W / 2, z: 0 }, { x: L / 2, y: W / 2, z: 0 }],
        [{ x: L / 2, y: W / 2, z: 0 }, { x: s2x, y: W / 2, z: 0 }],
      ];
      const strips: any[] = [];
      for (let y = 3; y < W; y += 4)
        strips.push([{ x: 0, y: y, z: COURT.ceilingH }, { x: L, y: y, z: COURT.ceilingH }]);
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
      for (const seg of model.segments.slice(0, 4)) drawSegment(seg[0], seg[1], S, cx, cy, 2);
      for (let i = 4; i < model.segments.length; i++) {
        const s = model.segments[i];
        if (s.length === 2) drawSegment(s[0], s[1], S, cx, cy, 2);
        else drawPolyline(s, S, cx, cy, 2);
      }
      for (const seg of model.lines) drawSegment(seg[0], seg[1], S, cx, cy, 2, "#fff");
      const netRes = 20;
      for (let i = 0; i < netRes; i++) {
        const t = i / netRes,
          y = t * COURT.W;
        const h =
          COURT.net.hCenter +
          (COURT.net.hPost - COURT.net.hCenter) * Math.pow((y - COURT.W / 2) / (COURT.W / 2), 2);
        drawSegment({ x: COURT.L / 2, y, z: 0 }, { x: COURT.L / 2, y, z: h }, S, cx, cy, 1, "#777");
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
          "#777"
        );
      }
      drawPolyline(model.netPts, S, cx, cy, 2, "#fff");
      for (const strip of model.strips) drawSegment(strip[0], strip[1], S, cx, cy, 5, "#888");

      // Front logo that fades as we pull back
      ctx.save();
      const logoScale = 1 - scrollT;
      ctx.globalAlpha = logoScale;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${150 * logoScale}px sans-serif`;
      ctx.fillText("CLUB FORE", cx, window.innerHeight * 0.3);
      ctx.restore();
    }

    function loop() {
      draw();
      requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-screen h-screen bg-black" />;
}


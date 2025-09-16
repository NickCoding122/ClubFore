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
      cornerLen: 2.0,
      lineWidth: 0.05,
      serviceFromNet: 6.95,
      ceilingH: 6.0,
      net: { hCenter: 0.88, hPost: 0.92, postMax: 1.05 },
    };

    // Camera starts near the far wall (logo fills view) and scrolls backward
    const CAM = { x: COURT.L - 2.5, y: 5.0, z: 1.7, f: 8.0 };

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", resize);
    resize();

    // Scroll drives camera.x: from far wall (~17.5) back to ~2.5
    function onScroll() {
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      const t = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      CAM.x = COURT.L - 2.5 - t * 15; // 17.5 → 2.5
    }
    window.addEventListener("scroll", onScroll);
    onScroll();

    function project(p: any, scale: number, cx: number, cy: number) {
      const dx = p.x - CAM.x;
      if (dx <= 0) return null;
      const dy = p.y - CAM.y,
        dz = p.z - CAM.z;
      const k = CAM.f / dx;
      return { x: cx + dy * k * scale, y: cy - dz * k * scale };
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
      // Clip segment to a plane just in front of the camera so lines that
      // begin behind the camera (like the sidelines) are still rendered.
      const near = CAM.x + 0.01;
      let a1 = { ...a },
        b1 = { ...b };
      if (a1.x <= near && b1.x <= near) return; // entire segment behind camera
      if (a1.x <= near) {
        const t = (near - a1.x) / (b1.x - a1.x);
        a1 = {
          x: near,
          y: a1.y + (b1.y - a1.y) * t,
          z: a1.z + (b1.z - a1.z) * t,
        };
      }
      if (b1.x <= near) {
        const t = (near - b1.x) / (a1.x - b1.x);
        b1 = {
          x: near,
          y: b1.y + (a1.y - b1.y) * t,
          z: b1.z + (a1.z - b1.z) * t,
        };
      }
      const A = project(a1, S, cx, cy);
      const B = project(b1, S, cx, cy);
      if (!A || !B) return;
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
      if (points.length < 2) return;
      // Draw each consecutive pair as a clipped segment so that lines
      // remain visible even if some points fall behind the camera.
      for (let i = 0; i < points.length - 1; i++) {
        drawSegment(points[i], points[i + 1], S, cx, cy, w, style);
      }
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

      // walls
      const corners = [
        { x: 0, y: 0 },
        { x: 0, y: W },
        { x: L, y: 0 },
        { x: L, y: W },
      ];
      for (const c of corners)
        g.push([{ x: c.x, y: c.y, z: 0 }, { x: c.x, y: c.y, z: COURT.backTotalH }]);
      g.push(
        [{ x: 0, y: 0, z: COURT.backTotalH }, { x: 0, y: W, z: COURT.backTotalH }],
        [{ x: L, y: 0, z: COURT.backTotalH }, { x: L, y: W, z: COURT.backTotalH }]
      );
      const sidePosts = [
        { x: COURT.cornerLen, h: COURT.backTotalH },
        { x: L / 2, h: COURT.backTotalH },
        { x: L - COURT.cornerLen, h: COURT.backTotalH },
      ];
      for (const p of sidePosts) {
        g.push(
          [{ x: p.x, y: 0, z: 0 }, { x: p.x, y: 0, z: p.h }],
          [{ x: p.x, y: W, z: 0 }, { x: p.x, y: W, z: p.h }]
        );
      }
      const sideTopPts = [
        { x: 0, h: COURT.backTotalH },
        ...sidePosts,
        { x: L, h: COURT.backTotalH },
      ];
      g.push(sideTopPts.map((p) => ({ x: p.x, y: 0, z: p.h }))); // y = 0 side
      g.push(sideTopPts.map((p) => ({ x: p.x, y: W, z: p.h }))); // y = W side
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
      const halfLine = COURT.lineWidth / 2;
      const lines = [
        // sidelines (slightly inset from outer edge)
        [{ x: 0, y: halfLine, z: 0 }, { x: L, y: halfLine, z: 0 }],
        [{ x: 0, y: W - halfLine, z: 0 }, { x: L, y: W - halfLine, z: 0 }],
        // baselines
        [{ x: 0, y: 0, z: 0 }, { x: 0, y: W, z: 0 }],
        [{ x: L, y: 0, z: 0 }, { x: L, y: W, z: 0 }],
        // service lines
        [{ x: s1x, y: 0, z: 0 }, { x: s1x, y: W, z: 0 }],
        [{ x: s2x, y: 0, z: 0 }, { x: s2x, y: W, z: 0 }],
        // center line
        [{ x: s1x, y: W / 2, z: 0 }, { x: L / 2, y: W / 2, z: 0 }],
        [{ x: L / 2, y: W / 2, z: 0 }, { x: s2x, y: W / 2, z: 0 }],
      ];
      return { segments: g, lines, netPts };
    }
    const model = build();

    function draw() {
      const pad = 40,
        vw = window.innerWidth - pad * 2,
        vh = window.innerHeight - pad * 2;
      const S = Math.min(vw / (COURT.W * 1.1), vh / (COURT.ceilingH * 2.0));
      const cx = window.innerWidth / 2,
        cy = window.innerHeight * 0.6;
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

      // Courtier logo on far wall
      const logoPos = { x: COURT.L - 0.01, y: COURT.W / 2, z: 2.5 };
      const lp = project(logoPos, S, cx, cy);
      if (lp) {
        const depth = logoPos.x - CAM.x;
        const k = CAM.f / depth;
        const fontSize = 1 * k * S; // ~1m text height
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillText("COURTIER", lp.x, lp.y);
      }

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

  return <canvas ref={canvasRef} className="block w-dvw h-dvh bg-black" />;
}


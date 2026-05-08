"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      const gradient = ctx.createRadialGradient(
        w * (0.5 + 0.3 * Math.sin(time * 0.5)),
        h * (0.5 + 0.2 * Math.sin(time * 0.3)),
        0,
        w * (0.5 + 0.3 * Math.sin(time * 0.5)),
        h * (0.5 + 0.2 * Math.sin(time * 0.3)),
        w * 0.8
      );

      gradient.addColorStop(0, "rgba(139, 0, 0, 0.08)");
      gradient.addColorStop(0.5, "rgba(197, 160, 89, 0.04)");
      gradient.addColorStop(1, "rgba(15, 15, 15, 0)");

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      const gradient2 = ctx.createRadialGradient(
        w * (0.3 + 0.2 * Math.sin(time * 0.7)),
        h * (0.7 + 0.15 * Math.sin(time * 0.4)),
        0,
        w * (0.3 + 0.2 * Math.sin(time * 0.7)),
        h * (0.7 + 0.15 * Math.sin(time * 0.4)),
        w * 0.5
      );

      gradient2.addColorStop(0, "rgba(197, 160, 89, 0.06)");
      gradient2.addColorStop(1, "rgba(15, 15, 15, 0)");

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

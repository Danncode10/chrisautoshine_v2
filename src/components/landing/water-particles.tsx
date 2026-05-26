"use client";

import { useEffect, useRef, useState } from "react";

interface WaterParticlesProps {
  active: boolean;
  count?: number;
}

/**
 * Ambient particle field — cursor movement pushes particles along its
 * direction of travel (water-like flow trail). Pauses when off-screen
 * via IntersectionObserver. Honors prefers-reduced-motion.
 * Particles use red hues to match Chris Auto Shine branding.
 */
export function WaterParticles({ active, count = 120 }: WaterParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!active) return;
    setMounted(true);
  }, [active]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      baseX: number; baseY: number;
      size: number; angle: number;
      hue: number; alpha: number;
    };

    const particles: Particle[] = [];
    const mouse = { x: -10000, y: -10000, prevX: -10000, prevY: -10000, vx: 0, vy: 0, active: false };

    let width = 0, height = 0, dpr = 1, rafId = 0, visible = true, fadeIn = 0;

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x, y, baseX: x, baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1.5 + Math.random() * 2.5,
          angle: Math.random() * Math.PI,
          hue: Math.random() * 20,       // 0–20 → red/orange range
          alpha: 0.35 + Math.random() * 0.5,
        });
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    };

    const draw = () => {
      if (!visible) { rafId = requestAnimationFrame(draw); return; }

      fadeIn = Math.min(1, fadeIn + 0.012);
      ctx.clearRect(0, 0, width, height);

      mouse.vx = mouse.x - mouse.prevX;
      mouse.vy = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      const FORCE_RADIUS = 200;
      const FORCE_RADIUS_SQ = FORCE_RADIUS * FORCE_RADIUS;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < FORCE_RADIUS_SQ) {
            const falloff = 1 - distSq / FORCE_RADIUS_SQ;
            const strength = falloff * 0.55;
            p.vx += mouse.vx * strength * 0.08;
            p.vy += mouse.vy * strength * 0.08;
            const flowAngle = Math.atan2(mouse.vy, mouse.vx);
            p.angle += (flowAngle - p.angle) * 0.05 * falloff;
          }
        }

        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
        p.angle += (Math.random() - 0.5) * 0.03;
        p.vx += (p.baseX - p.x) * 0.0005;
        p.vy += (p.baseY - p.y) * 0.0005;
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;

        const a = p.alpha * fadeIn;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 65%, ${a})`;
        ctx.lineWidth = 1.4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.size, 0);
        ctx.lineTo(p.size, 0);
        ctx.stroke();
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      mouse.x = x; mouse.y = y;
      mouse.active = x >= 0 && x <= width && y >= 0 && y <= height;
    };
    const onLeave = () => { mouse.active = false; };

    const observer = new IntersectionObserver(
      (entries) => { visible = entries[0]?.isIntersecting ?? false; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    if (!reduce) {
      rafId = requestAnimationFrame(draw);
    } else {
      fadeIn = 1;
      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.strokeStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
        ctx.lineWidth = 1.4; ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.size, 0); ctx.lineTo(p.size, 0);
        ctx.stroke();
        ctx.restore();
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [mounted, count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      {mounted && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}

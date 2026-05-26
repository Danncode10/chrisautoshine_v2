"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/landing/typewriter";
import { WaterParticles } from "@/components/landing/water-particles";
import { businessConfig } from "@/lib/business-config";

// ─── MagneticCTA ─────────────────────────────────────────────────────────────
function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    target.current = {
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.18,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.18,
    };
  }, []);

  const onLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      el.style.transform = `translate3d(${current.current.x}px,${current.current.y}px,0)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

  return (
    <a
      ref={ref}
      href={href}
      className="inline-flex items-center gap-2.5 px-8 py-4 text-white font-bold text-base rounded-lg tracking-[0.15em] uppercase will-change-transform transition-opacity hover:opacity-90"
      style={{
        fontFamily: "var(--font-display)",
        background: "linear-gradient(135deg, #e01818, #a40e0e)",
        boxShadow: "0 10px 32px rgba(220,18,18,0.6), inset 0 1px 0 rgba(255,120,120,0.3)",
      }}
    >
      {children}
    </a>
  );
}

// ─── CompanyNameReveal ─────────────────────────────────────────────────────────
// Word-by-word spring reveal with AUTO in red — mounts only after intro complete
function CompanyNameReveal() {
  const words = [
    { text: "CHRIS", red: false },
    { text: "AUTO", red: true },
    { text: "SHINE", red: false },
    { text: "DETAILING", red: false },
  ] as const;

  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      {words.map(({ text, red }, i) => (
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 28, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: i * 0.13,
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="font-bold select-none"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 6.5vw, 84px)",
            color: red ? "var(--color-primary)" : "rgba(255,255,255,0.9)",
            textShadow: red
              ? "0 0 40px rgba(220,20,20,0.7), 2px 2px 0 rgba(60,0,0,0.55)"
              : "2px 2px 0 rgba(0,0,0,0.6)",
          }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const [particlesActive, setParticlesActive] = useState(false);
  const [line1Done, setLine1Done] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    document.body.classList.add("intro-active");
    const t = setTimeout(() => setParticlesActive(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleLine1Complete = () => setLine1Done(true);
  const handleLine2Complete = () => {
    document.body.classList.remove("intro-active");
    setIntroComplete(true);
  };

  const line1 = "We bring out the shine";
  const line2 = "that keeps you moving.";
  const shineStart = line1.indexOf("the shine");

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#050608" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/images/truck.jpg"
          alt=""
          fill
          priority
          className="object-cover transition-all duration-1000 ease-out"
          style={{
            objectPosition: "65% 50%",
            filter: `contrast(1.15) saturate(1.2) brightness(0.82) blur(${introComplete ? "0px" : "8px"})`,
          }}
        />
      </div>

      {/* ── Overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,5,8,0.97) 0%, rgba(4,5,8,0.88) 28%, rgba(4,5,8,0.55) 52%, rgba(4,5,8,0.1) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,5,8,0.75) 0%, transparent 20%), linear-gradient(0deg, rgba(4,5,8,0.95) 0%, rgba(4,5,8,0.45) 20%, transparent 36%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: "-120px",
          top: "32%",
          width: "380px",
          height: "380px",
          background: "radial-gradient(circle, rgba(220,20,20,0.22), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* ── Particles ── */}
      <WaterParticles active={particlesActive} />

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 sm:px-10 md:px-11 pt-28 md:pt-32 pb-10">

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center mt-8 max-w-3xl space-y-5">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-0.5 bg-primary flex-shrink-0" />
            <span
              className="font-semibold text-primary text-sm tracking-[0.28em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Detailing Specialists
            </span>
          </motion.div>

          {/* ── Tagline (typed) ── */}
          <div>
            {/* Line 1 — typed, "the shine" highlights red after complete */}
            <h1
              className="font-bold text-white leading-[1.06]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 4vw, 48px)",
                textShadow: "2px 3px 0 rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.9)",
              }}
            >
              <Typewriter
                text={line1}
                speed={55}
                delay={350}
                onComplete={handleLine1Complete}
                highlight={{
                  start: shineStart,
                  end: shineStart + "the shine".length,
                  delay: 300,
                }}
              />
            </h1>

            {/* Line 2 — placeholder reserves space, Typewriter mounts when line 1 done */}
            <h1
              className="font-bold text-white leading-[1.06]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 4vw, 48px)",
                textShadow: "2px 3px 0 rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.9)",
              }}
            >
              {line1Done ? (
                <Typewriter
                  text={line2}
                  speed={55}
                  delay={0}
                  onComplete={handleLine2Complete}
                />
              ) : (
                // Invisible placeholder keeps layout stable
                <span style={{ opacity: 0 }}>{line2}</span>
              )}
            </h1>
          </div>

          {/* ── Company name reveal (springs in after typing) ── */}
          {introComplete && (
            <div className="space-y-3 pt-2">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-0.5 w-16 bg-primary/70 origin-left"
              />
              <CompanyNameReveal />
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        {introComplete && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticCTA href="#contact">
              Book a Detail
              <ArrowRight className="w-4 h-4" />
            </MagneticCTA>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/70 hover:text-white font-medium rounded-lg border border-white/10 hover:border-white/25 transition-colors"
            >
              View Services
            </a>
          </motion.div>
        )}

        {/* Scroll hint */}
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-col items-start gap-2"
            aria-hidden
          >
            <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent"
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}

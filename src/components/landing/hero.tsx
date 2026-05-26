"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
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
        background: "linear-gradient(135deg, #e01818, #a40e0e)",
        boxShadow: "0 10px 32px rgba(220,18,18,0.6), inset 0 1px 0 rgba(255,120,120,0.3)",
        fontFamily: "var(--font-display)",
      }}
    >
      {children}
    </a>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const [particlesActive, setParticlesActive] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    document.body.classList.add("intro-active");
    const t = setTimeout(() => setParticlesActive(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleTypewriterComplete = () => {
    document.body.classList.remove("intro-active");
    setIntroComplete(true);
  };

  const socials = businessConfig.socials;

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
          className="object-cover"
          style={{
            objectPosition: "65% 50%",
            filter: "contrast(1.15) saturate(1.2) brightness(0.82)",
          }}
        />
      </div>

      {/* ── Overlays ── */}
      {/* Left gradient — keeps text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(4,5,8,0.97) 0%, rgba(4,5,8,0.88) 28%, rgba(4,5,8,0.55) 52%, rgba(4,5,8,0.1) 75%, transparent 100%)",
        }}
      />
      {/* Top + bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,5,8,0.75) 0%, transparent 20%), linear-gradient(0deg, rgba(4,5,8,0.95) 0%, rgba(4,5,8,0.45) 20%, transparent 36%)",
        }}
      />
      {/* Left red accent glow */}
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

      {/* ── Water particles ── */}
      <WaterParticles active={particlesActive} />

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 sm:px-10 md:px-11 pt-28 md:pt-32 pb-8">

        {/* Row 1: Brand mark + Offer badge */}
        <div className="flex items-start justify-between">
          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3.5"
          >
            <div
              className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(180,15,15,0.18)",
                boxShadow: "0 0 28px rgba(220,18,18,0.55)",
              }}
            >
              <span
                className="font-bold text-primary text-lg tracking-wide"
                style={{ fontFamily: "var(--font-display)" }}
              >
                CAS
              </span>
            </div>
            <div>
              <p
                className="font-bold text-white text-lg uppercase tracking-[0.13em]"
                style={{
                  fontFamily: "var(--font-display)",
                  textShadow: "0 2px 12px rgba(0,0,0,0.9)",
                }}
              >
                Chris Auto Shine
              </p>
              <p className="text-[10px] text-white/50 tracking-[0.22em] uppercase mt-1">
                Professional Detailing
              </p>
            </div>
          </motion.div>

          {/* Offer badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{
              opacity: introComplete ? 1 : 0,
              scale: introComplete ? 1 : 0.8,
              rotate: -2,
            }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="hidden sm:block text-center rounded-lg px-5 py-4 min-w-[148px] select-none"
            style={{
              background: "linear-gradient(135deg, #d61515, #8a0a0a)",
              border: "1.5px solid rgba(255,90,90,0.55)",
              boxShadow: "0 0 40px rgba(220,18,18,0.5), inset 0 1px 0 rgba(255,120,120,0.25)",
            }}
          >
            <div
              className="font-bold text-white leading-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "64px",
                textShadow: "0 4px 14px rgba(0,0,0,0.4)",
              }}
            >
              20%
            </div>
            <div
              className="font-bold text-white tracking-[0.32em] my-1"
              style={{ fontFamily: "var(--font-display)", fontSize: "26px" }}
            >
              OFF
            </div>
            <div className="border-t border-white/35 pt-2 mt-1">
              <p className="text-[11px] font-bold text-white tracking-[0.14em] uppercase">
                Your First Detail
              </p>
              <p className="text-[9px] text-white/75 tracking-[0.18em] uppercase mt-1">
                Limited Time
              </p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Main headline */}
        <div className="mt-8 flex-1 flex flex-col justify-center max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-12 h-0.5 bg-primary flex-shrink-0" />
            <span
              className="font-semibold text-primary text-sm tracking-[0.28em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Auto Detailing Specialists
            </span>
          </motion.div>

          {/* CHRIS */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-bold text-white leading-[0.92] select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(72px, 14vw, 150px)",
                textShadow: "4px 4px 0 rgba(0,0,0,0.55), 0 6px 30px rgba(0,0,0,0.9)",
              }}
            >
              CHRIS
            </h1>
          </motion.div>

          {/* AUTO — red with glow */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-bold text-primary leading-[0.92] select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(72px, 14vw, 150px)",
                textShadow: "0 0 60px rgba(220,20,20,0.85), 4px 4px 0 rgba(60,0,0,0.55)",
              }}
            >
              AUTO
            </h1>
          </motion.div>

          {/* SHINE — Typewriter triggers intro complete */}
          <h1
            className="font-bold text-white leading-[0.92]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 12.5vw, 140px)",
              textShadow: "4px 4px 0 rgba(0,0,0,0.55), 0 6px 30px rgba(0,0,0,0.9)",
            }}
          >
            <Typewriter
              text="SHINE"
              speed={90}
              delay={800}
              onComplete={handleTypewriterComplete}
            />
          </h1>
        </div>

        {/* Row 3: Tagline + CTA — revealed after typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 18 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 space-y-7"
        >
          {/* Tagline */}
          <div>
            <p
              className="font-semibold text-white leading-[1.12]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 4vw, 44px)",
                textShadow: "2px 3px 0 rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.9)",
              }}
            >
              We bring out{" "}
              <span className="text-primary">the shine</span>
            </p>
            <p
              className="font-semibold text-white leading-[1.12]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 4vw, 44px)",
                textShadow: "2px 3px 0 rgba(0,0,0,0.75), 0 4px 18px rgba(0,0,0,0.9)",
              }}
            >
              that keeps you moving.
            </p>
            <p
              className="text-white/90 text-base mt-4 max-w-xl leading-relaxed"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}
            >
              Premium auto &amp; truck detailing for vehicles that take pride in looking
              as good as they perform.
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-6">
            <MagneticCTA href="#contact">
              Book Now
              <ArrowRight className="w-4 h-4" />
            </MagneticCTA>

            <div>
              <p
                className="font-bold text-white text-lg"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
              >
                {socials.facebook || socials.tiktok ? "@chrisautoshine" : businessConfig.name}
              </p>
              <p
                className="text-sm font-semibold text-white/70 tracking-[0.2em] uppercase mt-1"
                style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
              >
                {[socials.facebook && "Facebook", socials.tiktok && "TikTok"]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Row 4: Location bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-3.5 px-5 py-3.5 rounded border-l-4 border-primary backdrop-blur-sm max-w-xl"
          style={{ background: "rgba(4,5,8,0.65)" }}
        >
          <div className="w-9 h-9 rounded-full border border-primary bg-primary/20 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p
              className="text-white font-bold text-sm tracking-wide leading-snug"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
            >
              {businessConfig.contact.address}
            </p>
            <p className="text-white/70 text-xs tracking-wide mt-0.5">
              {businessConfig.contact.email}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

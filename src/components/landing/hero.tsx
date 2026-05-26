"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Car, Droplets } from "lucide-react";
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
      className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 will-change-transform"
    >
      {children}
    </a>
  );
}

// ─── TiltCard ─────────────────────────────────────────────────────────────────
function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      target.current = { rx: y * -12, ry: x * 12 };
    };
    const onLeave = () => {
      target.current = { rx: 0, ry: 0 };
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    const animate = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.1;
      current.current.ry += (target.current.ry - current.current.ry) * 0.1;
      el.style.transform = `perspective(800px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="will-change-transform cursor-default select-none">
      <div className="relative rounded-3xl p-px bg-gradient-to-br from-white/20 via-white/5 to-transparent inner-highlight overflow-hidden">
        <div className="bg-card rounded-3xl p-7 w-80 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Premium Detailing</p>
              <p className="text-muted-foreground text-xs">Brisbane, QLD</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: Droplets, label: "Full Exterior Wash", done: true },
              { icon: Sparkles, label: "Interior Vacuum & Wipe", done: true },
              { icon: Car, label: "Wax & Polish Finish", done: false },
            ].map(({ icon: Icon, label, done }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    done ? "border-primary bg-primary/20" : "border-white/20"
                  }`}
                >
                  {done && <div className="w-2 h-2 rounded-full bg-primary" />}
                </div>
                <span className={`text-sm ${done ? "text-white" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Estimated time</span>
            <span className="text-xs text-white font-medium">2–3 hrs</span>
          </div>
        </div>
      </div>
    </div>
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

  const headline = businessConfig.tagline;
  const highlightIdx = headline.indexOf("shine");
  const highlight =
    highlightIdx >= 0
      ? { start: highlightIdx, end: highlightIdx + 5, delay: 400 }
      : undefined;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-0 grid-fade-overlay" aria-hidden />
      <div className="absolute inset-0 grid-fade-overlay-v" aria-hidden />

      {/* Canvas particles */}
      <WaterParticles active={particlesActive} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row items-center gap-16 w-full">
        {/* ── Left: copy ── */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3 h-3" />
              Professional Mobile Detailing
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight">
            <Typewriter
              text={headline}
              speed={45}
              delay={400}
              highlight={highlight}
              onComplete={handleTypewriterComplete}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: introComplete ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Premium mobile car detailing brought straight to your door.
            Serving Brisbane and surrounding areas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
          >
            <MagneticCTA href="#contact">
              Book a Detail
              <ArrowRight className="w-4 h-4" />
            </MagneticCTA>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/70 hover:text-white font-medium rounded-2xl border border-white/10 hover:border-white/25 transition-colors"
            >
              View Services
            </a>
          </motion.div>
        </div>

        {/* ── Right: TiltCard ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          animate={{
            opacity: introComplete ? 1 : 0,
            scale: introComplete ? 1 : 0.95,
            x: introComplete ? 0 : 24,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <TiltCard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}

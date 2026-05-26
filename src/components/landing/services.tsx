"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Droplets, Car, Sparkles, Wrench } from "lucide-react";
import { Typewriter } from "@/components/landing/typewriter";

const services = [
  {
    icon: Droplets,
    title: "Exterior Wash",
    description:
      "Full hand wash, wheel clean, tire dressing, and streak-free windows. Your car leaves spotless every time.",
  },
  {
    icon: Car,
    title: "Interior Detailing",
    description:
      "Deep vacuum, dashboard wipe, leather conditioning, and odor elimination for a fresh cabin experience.",
  },
  {
    icon: Sparkles,
    title: "Waxing & Polishing",
    description:
      "Machine polish and premium carnauba wax protect your paint and deliver a mirror-like, showroom shine.",
  },
  {
    icon: Wrench,
    title: "Paint Correction",
    description:
      "Multi-stage machine compound removes swirl marks, scratches, and oxidation — restoring factory clarity.",
  },
];

type ServiceItem = (typeof services)[0];

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    glow.style.background = `radial-gradient(300px at ${e.clientX - rect.left}px ${
      e.clientY - rect.top
    }px, rgba(220,38,38,0.12), transparent 70%)`;
  }, []);

  const onLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.background = "none";
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl p-px bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent inner-highlight overflow-hidden cursor-default"
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none z-0 transition-all duration-75"
      />

      <div className="relative z-10 bg-card rounded-3xl p-6 h-full flex flex-col gap-5">
        <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-sm opacity-40" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            <Typewriter text="Services Built for Shine" speed={35} />
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            From a quick wash to a full paint correction, every service is delivered with
            professional-grade products and meticulous care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

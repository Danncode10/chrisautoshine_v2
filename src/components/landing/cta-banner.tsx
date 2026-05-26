"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Typewriter } from "@/components/landing/typewriter";

export function CtaBanner() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(220,38,38,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-semibold uppercase tracking-widest text-primary"
        >
          Ready to Shine?
        </motion.p>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          <Typewriter text="Your car deserves the best." speed={38} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-lg max-w-xl mx-auto"
        >
          Book your professional mobile detail today and experience the difference a
          premium clean makes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Book a Detail
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#packages"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white/70 hover:text-white font-medium rounded-2xl border border-white/10 hover:border-white/25 transition-colors"
          >
            View Packages
          </a>
        </motion.div>
      </div>
    </section>
  );
}

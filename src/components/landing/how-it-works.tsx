"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { Typewriter } from "@/components/landing/typewriter";

const steps = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Book Your Service",
    description:
      "Fill out our quick booking form or send us a message. We'll confirm your appointment within 24 hours.",
    terminal: [
      "> Selecting service...",
      "> Choosing date & time...",
      "> ✓ Booking confirmed!",
    ],
  },
  {
    number: "02",
    icon: MapPin,
    title: "We Come to You",
    description:
      "Our mobile team arrives at your location — home, work, or anywhere in Brisbane. No waiting around.",
    terminal: [
      "> Locating your address...",
      "> Mobile team en route...",
      "> ✓ Arrived on-site!",
    ],
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Your Car Shines",
    description:
      "Sit back while we transform your vehicle with professional-grade products and expert techniques.",
    terminal: [
      "> Detailing in progress...",
      "> Final quality check...",
      "> ✓ Your car shines!",
    ],
  },
];

function TerminalCard({ lines }: { lines: string[] }) {
  return (
    <div className="rounded-2xl bg-black border border-white/10 font-mono text-xs overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="px-4 py-4 space-y-2">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.includes("✓") ? "text-primary font-semibold" : "text-white/55"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            The Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            <Typewriter text="How It Works" speed={40} />
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Three simple steps from booking to a showroom-fresh vehicle.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl font-bold text-white/[0.06] select-none leading-none">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Terminal */}
                <div className="flex-1 w-full max-w-md">
                  <TerminalCard lines={step.terminal} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

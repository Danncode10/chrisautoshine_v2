"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Clock, CircleCheck } from "lucide-react";
import { businessConfig } from "@/lib/business-config";

const { rating, customers } = businessConfig.socialProof;

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    sub: "Licensed & Certified",
  },
  {
    icon: Star,
    title: `${rating}-Star Rated`,
    sub: `${customers} Happy Customers`,
  },
  {
    icon: Clock,
    title: "Same-Day",
    sub: "Available 7 Days",
  },
  {
    icon: CircleCheck,
    title: "Guaranteed",
    sub: "100% Satisfaction",
  },
];

export function SocialProofBar() {
  return (
    <section
      className="relative border-t-2 border-primary/50"
      style={{ background: "linear-gradient(180deg, rgba(2,3,7,0.92), rgba(2,3,7,1))" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10"
        >
          {trustItems.map(({ icon: Icon, title, sub }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 px-4 py-6 sm:px-6"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/60"
                style={{ background: "rgba(220,18,18,0.2)" }}
              >
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p
                  className="font-bold text-white text-sm sm:text-base tracking-[0.06em] uppercase leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {title}
                </p>
                <p className="text-xs text-white/60 tracking-[0.08em] uppercase mt-1.5 leading-tight font-semibold">
                  {sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

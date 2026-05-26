"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { businessConfig } from "@/lib/business-config";

export function SocialProofBar() {
  const { rating, ratingSource, customers, yearsInBusiness } = businessConfig.socialProof;

  const stats = [
    {
      value: `${rating}/5`,
      label: `${ratingSource} Rating`,
      icon: <Star className="w-4 h-4 fill-primary text-primary" />,
    },
    {
      value: customers,
      label: "Happy Customers",
      icon: null,
    },
    {
      value: `${yearsInBusiness}+`,
      label: "Years of Experience",
      icon: null,
    },
  ];

  return (
    <section className="border-y border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border"
        >
          {stats.map(({ value, label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-1 py-2"
            >
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-3xl font-bold text-white">{value}</span>
              </div>
              <span className="text-sm text-muted-foreground">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

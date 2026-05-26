"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Typewriter } from "@/components/landing/typewriter";
import { cn } from "@/lib/utils";

// ─── Data ──────────────────────────────────────────────────────────────────────

const VEHICLE_SIZES = ["Hatchback", "Sedan/UTE", "7 Seater"] as const;

type PriceTier = { label: string; price: string };
type Package = {
  name: string;
  features: string[];
  prices: PriceTier[];
  featured?: boolean;
  badge?: string;
};

const exteriorPackages: Package[] = [
  {
    name: "Auto 1",
    features: [
      "Snow Foam Wash + Exterior Windows",
      "Door Frames + Tire & Rim Shine",
      "Regular Exterior Cleaning",
    ],
    prices: [
      { label: "Hatchback", price: "$55" },
      { label: "Sedan/UTE", price: "$65" },
      { label: "7 Seater", price: "$75" },
    ],
  },
  {
    name: "Deluxe",
    features: [
      "Foam Wash + Hand Wax",
      "Interior Quick Vacuum & Dust Wipe",
      "Tire & Rim Shine",
    ],
    prices: [
      { label: "Hatchback", price: "$160" },
      { label: "Sedan/UTE", price: "$180" },
      { label: "7 Seater", price: "$200" },
    ],
  },
  {
    name: "Super",
    features: [
      "Foam Wash + Single Stage Polish",
      "Spray Wax + Tire & Rim Shine",
      "Quick Interior Clean",
    ],
    prices: [
      { label: "Hatchback", price: "$245" },
      { label: "Sedan/UTE", price: "$295" },
      { label: "7 Seater", price: "$345" },
    ],
  },
];

const interiorPackages: Package[] = [
  {
    name: "Plus",
    features: [
      "Interior Vacuum + Dust Wipe",
      "Snow Foam Wash + Exterior Wipe",
      "Spray Wax + Rim Shine",
    ],
    prices: [
      { label: "Hatchback", price: "$105" },
      { label: "Sedan/UTE", price: "$125" },
      { label: "7 Seater", price: "$145" },
    ],
  },
  {
    name: "Deluxe",
    features: [
      "Vacuum + Interior Panels Wipe",
      "Foam Wash + Spray Wax",
      "Tire & Rim Shine + 4 Door Shampoo",
    ],
    prices: [
      { label: "Hatchback", price: "$160" },
      { label: "Sedan/UTE", price: "$180" },
      { label: "7 Seater", price: "$200" },
    ],
  },
  {
    name: "Super",
    features: [
      "Interior Shampoo + Steam Clean",
      "Leather Conditioner",
      "Foam Wash + Spray Wax",
    ],
    prices: [
      { label: "Hatchback", price: "$245" },
      { label: "Sedan/UTE", price: "$295" },
      { label: "7 Seater", price: "$345" },
    ],
  },
];

const exclusivePackages: Package[] = [
  {
    name: "Auto Elite",
    badge: "Popular",
    featured: true,
    features: [
      "Full Interior — Shampoo, Steam Clean, Air Blow, Vacuum, Leather Conditioner",
      "Exterior Wash — Tires & Rims + Spray Wax + Foam Wash",
      "Single Stage Polish — Removes light swirls for extra shine",
    ],
    prices: [
      { label: "Hatchback", price: "$395" },
      { label: "Sedan/UTE", price: "$475" },
      { label: "7 Seater", price: "$545" },
    ],
  },
  {
    name: "Auto Super Elite",
    features: [
      "Complete Interior — Shampoo, Steam Clean, Vacuum, Leather Conditioner",
      "Deep Exterior — Tar Removal, Clay Bar & Engine Clean",
      "2–3 Stage Polish + Spray Wax — Professional finish & protection",
    ],
    prices: [
      { label: "Hatchback", price: "$999" },
      { label: "Sedan/UTE", price: "$1,250" },
      { label: "7 Seater", price: "$1,500" },
    ],
  },
];

const addOns = [
  { label: "Tar Removal", price: "$50–100" },
  { label: "Pet Hair Removal", price: "$50–100" },
  { label: "Odour Treatment", price: "$50" },
  { label: "Per Panel Polish", price: "$100" },
  { label: "Headlight Restoration", price: "$45" },
  { label: "Red Dirt Removal", price: "$100–150" },
  { label: "Ceramic Coating", price: "From $850" },
];

const paintCorrection = [
  { label: "Single Stage Polish", price: "$395" },
  { label: "Two Stage Polish", price: "$595" },
  { label: "Three Stage Polish", price: "$750" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-3xl p-px inner-highlight overflow-hidden flex flex-col",
        pkg.featured
          ? "bg-gradient-to-br from-primary/60 via-primary/20 to-transparent"
          : "bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent"
      )}
    >
      {pkg.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {pkg.badge}
          </span>
        </div>
      )}

      <div className="bg-card rounded-3xl p-6 flex flex-col gap-5 h-full">
        <h3 className="text-white font-bold text-xl">{pkg.name}</h3>

        <ul className="space-y-2 flex-1">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-2">
            {pkg.prices.map((p) => (
              <div key={p.label} className="text-center">
                <p className="text-[10px] text-muted-foreground mb-1">{p.label}</p>
                <p className={cn("font-bold", pkg.featured ? "text-primary text-lg" : "text-white text-base")}>
                  {p.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const TABS = [
  { key: "exterior", label: "Exterior", packages: exteriorPackages },
  { key: "interior", label: "Interior", packages: interiorPackages },
  { key: "exclusive", label: "Exclusive", packages: exclusivePackages },
] as const;

// ─── Export ───────────────────────────────────────────────────────────────────

export function Packages() {
  const [tab, setTab] = useState<"exterior" | "interior" | "exclusive">("exterior");
  const activeTab = TABS.find((t) => t.key === tab)!;

  return (
    <section id="packages" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            <Typewriter text="Choose Your Package" speed={35} />
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Tailored packages for every vehicle and budget. All prices vary by vehicle size.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 p-1 rounded-2xl bg-card border border-border">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  tab === t.key
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "grid gap-5",
              activeTab.packages.length === 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {activeTab.packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Extras */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Paint Correction */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Paint Correction</h3>
            <div className="rounded-3xl p-px bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent inner-highlight">
              <div className="bg-card rounded-3xl p-6 space-y-3">
                {paintCorrection.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="text-sm font-bold text-primary">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Add-ons</h3>
            <div className="rounded-3xl p-px bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent inner-highlight">
              <div className="bg-card rounded-3xl p-6 space-y-3">
                {addOns.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="text-sm font-bold text-primary">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Not sure which package is right for you?{" "}
          <a href="#contact" className="text-primary hover:underline font-medium">
            Get in touch
          </a>{" "}
          and we&apos;ll help you find the perfect fit.
        </p>
      </div>
    </section>
  );
}

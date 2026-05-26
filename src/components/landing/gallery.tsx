"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Typewriter } from "@/components/landing/typewriter";

const items = [
  { src: "/images/exterior-clean.jpg", title: "Exterior Detail", category: "Wash" },
  { src: "/images/interior-vacuum.jpg", title: "Interior Clean", category: "Interior" },
  { src: "/images/polishing.jpg", title: "Paint Correction", category: "Polish" },
  { src: "/images/waxing.jpg", title: "Wax & Shine", category: "Wax" },
  { src: "/images/about-team.jpg", title: "Mobile Service", category: "Mobile" },
  { src: "/images/trucktirecleaning.png", title: "Truck Detailing", category: "Trucks" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Our Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            <Typewriter text="Results That Speak" speed={35} />
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base">
            Every vehicle treated with the same level of care and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative group rounded-2xl overflow-hidden aspect-video bg-card"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                  {item.category}
                </span>
                <span className="text-white font-semibold text-base">{item.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

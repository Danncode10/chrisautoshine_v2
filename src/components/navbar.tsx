"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { businessConfig } from "@/lib/business-config";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#packages", label: "Packages" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-5xl rounded-2xl border px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-white/10 shadow-xl shadow-black/50"
            : "bg-black/40 backdrop-blur-md border-white/5"
        }`}
      >
        <a href="/" className="flex items-center gap-3 select-none">
          <div
            className="w-11 h-11 rounded-full border-2 border-primary overflow-hidden flex-shrink-0"
            style={{
              background: "rgba(0,0,0,0.55)",
              boxShadow: "0 0 20px rgba(220,18,18,0.45)",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/company-logo.png"
                alt="Chris Auto Shine"
                fill
                className="object-cover"
                style={{
                  objectPosition: "50% 75%",
                  filter: "invert(1)",
                  transform: "scale(2.2)",
                  transformOrigin: "50% 75%",
                }}
              />
            </div>
          </div>
          <div>
            <p className="font-bold text-white text-sm uppercase tracking-[0.13em]" style={{ fontFamily: "var(--font-display)" }}>
              {businessConfig.name}
            </p>
            <p className="text-[9px] text-white/50 tracking-[0.22em] uppercase">
              Professional Detailing
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          >
            Book Now
          </a>
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white p-1 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[72px] left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-white/70 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-white/10 my-1" />
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-center bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

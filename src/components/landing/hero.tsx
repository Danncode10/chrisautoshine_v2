"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="bg-black text-white py-16 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />
      <div className="absolute inset-0 bg-black opacity-20" />

      <div className="container mx-auto text-center relative z-10">
        <Image
          src="/company-logo.png"
          alt="Chris Auto Shine Logo"
          width={200}
          height={200}
          className="mx-auto mb-2 h-auto max-w-[200px]"
          priority
        />
        <div className="text-white text-base font-bold mb-4 text-center">PTY.LTD</div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4 text-white relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Welcome to Chris Auto Shine
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Professional car wash and detailing services to make your vehicle shine like new.
        </motion.p>

        <button
          onClick={scrollToContact}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all border-red-600 hover:border-red-700"
        >
          Book Now
        </button>
      </div>
    </section>
  );
}

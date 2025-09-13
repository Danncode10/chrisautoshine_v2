import React from 'react';
import { motion } from 'framer-motion';
import companyLogo from '../assets/company-logo.png';
import heroBg from '../assets/images/hero-bg.jpg';

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="bg-black text-white py-16 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="container mx-auto text-center relative z-10">
        <img
          className="mx-auto mb-6 h-auto max-w-[200px]"
          src={companyLogo}
          alt="Chris Auto Shine Logo"
        />

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

        {/* Scroll Button */}
        <button
          onClick={scrollToContact}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Hero;

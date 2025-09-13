import React from 'react';
import { motion } from 'framer-motion';
import companyLogo from '../assets/company-logo.png';
import heroBg from '../assets/images/hero-bg.jpg';

const Hero = () => {
  return (
    <section id="home" className="bg-black text-white py-16 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ 
          backgroundImage: `url(${heroBg})` 
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img className="mx-auto mb-6 h-auto max-w-[200px]" src={companyLogo} alt="Chris Auto Shine Logo" />
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4 text-white relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Welcome to Chris Auto Shine
          <motion.div
            className="absolute -bottom-1 left-0 h-1 bg-red-600 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          />
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
        <motion.button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          Book Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;

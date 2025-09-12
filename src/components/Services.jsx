import React from 'react';
import { motion } from 'framer-motion';

import ServiceCard from './ServiceCard';

const Services = () => {
  const servicesData = [
    {
      title: 'Exterior Wash',
      description: 'Thorough cleaning of the exterior to remove dirt, grime, and contaminants.'
    },
    {
      title: 'Interior Detailing',
      description: 'Deep clean of seats, carpets, dashboard, and all interior surfaces.'
    },
    {
      title: 'Waxing & Polishing',
      description: 'Protective wax application and polishing for a showroom shine.'
    }
  ];

  return (
    <section id="services" className="py-16 bg-black">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl text-red-600 font-bold text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Services
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-red-600 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;

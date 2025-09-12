import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;

"use client";

import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Exterior Wash",
    description: "Thorough cleaning of the exterior to remove dirt, grime, and contaminants.",
  },
  {
    title: "Interior Detailing",
    description: "Deep clean of seats, carpets, dashboard, and all interior surfaces.",
  },
  {
    title: "Waxing & Polishing",
    description: "Protective wax application and polishing for a showroom shine.",
  },
];

const galleryImages = [
  { src: "/images/exterior-clean.jpg", alt: "Exterior car cleaning" },
  { src: "/images/interior-vacuum.jpg", alt: "Interior vacuuming" },
  { src: "/images/polishing.jpg", alt: "Car polishing" },
  { src: "/images/waxing.jpg", alt: "Car waxing" },
  { src: "/images/trucktirecleaning.png", alt: "Truck tire cleaning" },
];

const extendedImages = [...galleryImages, ...galleryImages];

export function Services() {
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
          className="text-3xl md:text-4xl text-red-600 font-bold text-center mb-12 relative"
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

        {/* Auto-sliding Gallery */}
        <motion.div
          className="mb-8 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex py-4"
            animate={{ x: [0, -(galleryImages.length * 272)] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {extendedImages.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                className="flex-none w-64 h-40 object-cover rounded-lg shadow-md mx-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (index % galleryImages.length) * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-center md:text-left">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

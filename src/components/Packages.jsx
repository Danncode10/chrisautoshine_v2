import React from 'react';
import { motion } from 'framer-motion';

import PackageCard from './PackageCard';
import ServiceCard from './ServiceCard';

const Packages = () => {
  const packagesData = [
    {
      id: 'car-wash',
      title: 'Basic Car Wash',
      description: 'Quick exterior wash and dry.',
      price: '$20',
      features: ['Hand wash', 'Wheel cleaning', 'Tire shine']
    },
    {
      id: 'interior',
      title: 'Interior Detailing',
      description: 'Complete interior clean including vacuum and wipe down.',
      price: '$50',
      features: ['Vacuum seats & carpets', 'Dashboard clean', 'Window interior']
    },
    {
      id: 'exclusive',
      title: 'Exclusive Package',
      description: 'Full exterior and interior detailing with premium products.',
      price: '$100',
      features: ['Full wash & wax', 'Interior deep clean', 'Leather conditioning']
    }
  ];

  const truckServices = [
    {
      title: 'Engine Bay Clean',
      description: 'Thorough cleaning of the engine compartment to remove grease, dirt, and grime for better performance and appearance. Part of the $80 Truck/SUV Package.'
    },
    {
      title: 'Undercarriage Wash',
      description: 'High-pressure wash to remove mud, salt, and debris from the underbody, preventing corrosion. Included in the $80 Truck/SUV Package.'
    },
    {
      title: 'Heavy-Duty Interior',
      description: 'Robust cleaning tailored for truck interiors, handling heavy wear and stains effectively. Part of the $80 Truck/SUV Package.'
    }
  ];

  const additionalServices = [
    {
      title: 'Clay Bar Treatment',
      description: 'Removes embedded contaminants from the paint surface for a smoother finish and better wax adhesion. Starting at $10.'
    },
    {
      title: 'Headlight Restoration',
      description: 'Restores clarity to foggy or oxidized headlights, improving visibility and aesthetics. Starting at $10.'
    },
    {
      title: 'Odor Elimination',
      description: 'Professional treatment to eliminate stubborn odors using ozone or enzyme cleaners. Starting at $10.'
    }
  ];

  return (
    <section id="packages" className="py-16 bg-black">
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
          Our Packages
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-red-600 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {packagesData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <PackageCard
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                features={pkg.features}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl text-red-600 font-bold text-center mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Truck Services
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-red-600 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            />
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {truckServices.map((service, index) => (
              <ServiceCard key={index} title={service.title} description={service.description} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl text-red-600 font-bold text-center mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Additional Services
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-red-600 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            />
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {additionalServices.map((service, index) => (
              <ServiceCard key={index} title={service.title} description={service.description} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Packages;

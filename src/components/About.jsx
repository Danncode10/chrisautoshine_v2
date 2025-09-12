import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      id="about"
      className="py-16 bg-black"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white border-b-4 border-red-600 inline-block"
        >
          About Chris Auto Shine
        </motion.h2>
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            With over 10 years of experience in the auto detailing industry, Chris Auto Shine is dedicated to providing top-quality car wash and detailing services. 
            Our team of certified professionals uses eco-friendly products and state-of-the-art equipment to ensure your vehicle receives the best care possible.
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            We believe in transparency, quality, and customer satisfaction. That's why we offer a satisfaction guarantee on all our services.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
              <p className="text-gray-300">Years Experience</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
              <p className="text-gray-300">Happy Customers</p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">5★</div>
              <p className="text-gray-300">Rating</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;

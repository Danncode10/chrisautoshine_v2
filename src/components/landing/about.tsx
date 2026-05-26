"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <motion.section id="about" className="py-16 bg-black">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          About Chris Auto Shine Detailing
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-red-600 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </motion.h2>

        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            With over 10 years of experience in the auto detailing industry, Chris Auto Shine Detailing is
            dedicated to providing top-quality car wash and detailing services. Our team of certified
            professionals uses eco-friendly products and state-of-the-art equipment to ensure your
            vehicle receives the best care possible.
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-gray-300 mb-8 leading-relaxed"
          >
            We believe in transparency, quality, and customer satisfaction. That&apos;s why we offer a
            satisfaction guarantee on all our services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-8"
          >
            <Image
              src="/images/about-team.jpg"
              alt="Professional car detailing service"
              width={896}
              height={256}
              className="w-full h-64 object-cover rounded-lg shadow-md mx-auto max-w-4xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            {[
              { value: "10+", label: "Years Experience" },
              { value: "1000+", label: "Happy Customers" },
              { value: "5★", label: "Rating" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

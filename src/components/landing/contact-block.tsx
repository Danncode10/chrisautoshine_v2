"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { siteConfig } from "@/lib/config";

export function ContactBlock() {
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        emailjs
          .sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID!,
            form.current!,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          )
          .then(() => {
            alert("Message sent! You'll also receive a confirmation email.");
            form.current?.reset();
          })
          .catch(() => alert("Message sent, but auto-reply failed."));
      })
      .catch(() => alert("Failed to send the message. Please try again."));
  };

  return (
    <section id="contact" className="py-16 bg-black">
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
          Contact Us
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-red-600 origin-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          />
        </motion.h2>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex justify-center space-x-6 mb-12 flex-wrap">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-gray-300 hover:text-red-600 transition-colors"
            >
              <FaEnvelope size={32} />
            </a>
            {siteConfig.socials.facebook && (
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 transition-colors"
              >
                <FaFacebook size={32} />
              </a>
            )}
            {siteConfig.socials.instagram ? (
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 transition-colors"
              >
                <FaInstagram size={32} />
              </a>
            ) : (
              <span className="text-gray-500 opacity-40 cursor-not-allowed">
                <FaInstagram size={32} />
              </span>
            )}
            {siteConfig.socials.tiktok && (
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-600 transition-colors"
              >
                <FaTiktok size={32} />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email address"
                  className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Have a question, want an appointment, or tell us the service you need..."
                  className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg w-full py-3 font-semibold border-red-600"
                whileHover={{ scale: 1.02 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <iframe
              src={siteConfig.contact.googleMapsEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border-2 border-red-600 w-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

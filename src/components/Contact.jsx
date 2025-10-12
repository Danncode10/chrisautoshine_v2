import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaFacebook, FaInstagram, FaTiktok} from 'react-icons/fa';

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email to business (main template)
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      // Send auto-reply to customer (second template)
      emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID, // 👈 create this in EmailJS
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent! You'll also receive a confirmation email.");
        form.current.reset();
      })
      .catch(() => {
        alert("Message sent, but auto-reply failed.");
      });
    })
    .catch(() => {
      alert('Failed to send the message. Please try again.');
    });
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex justify-center space-x-6 mb-12 flex-wrap">
            <a 
              href="mailto:info@chrisautoshinedetailing.com.au" 
              className="text-gray-300 hover:text-red-600 text-lg font-medium transition-colors"
            >
              <FaEnvelope size={32}/>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61579380248722" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-600 text-lg font-medium transition-colors"
            >
              <FaFacebook size={32}/>
            </a>
            <a 
              href="#" 
              className="text-gray-400 opacity-50 text-lg font-medium cursor-not-allowed"
            >
              <FaInstagram size={32}/>
            </a>
            <a 
              href="https://www.tiktok.com/@malaykosayuwolf" 
              className="text-gray-400 opacity-50 text-lg font-medium cursor-not-allowed"
            >
              <FaTiktok size={32}/>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
    {/* Name field */}
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Name
      </label>
      <input
        type="text"
        name="user_name"
        placeholder="Enter your name"
        className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full 
                   focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
        required
      />
    </div>

    {/* Email field */}
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Email
      </label>
      <input
        type="email"
        name="user_email"
        placeholder="Enter your email address"
        className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full 
                   focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
        required
      />
    </div>

    {/* Message field */}
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Message
      </label>
      <textarea
        name="message"
        rows="5"
        placeholder="Have a question, want an appointment, or tell us the service you need..."
        className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full 
                   focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400"
        required
      ></textarea>
    </div>

    {/* Submit button */}
    <motion.button
      type="submit"
      className="bg-red-600 hover:bg-red-700 text-white rounded-lg w-full py-3 font-semibold"
      whileHover={{ scale: 1.02 }}
    >
      Send Message
    </motion.button>
  </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15600.000000000000!2d153.0724!3d-27.2486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m1!1s26%20Cameron%20St%2C%20Clontarf%204019%2C%20Australia!5e0!3m2!1sen!2sus!4v1726200000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border-2 border-red-600 w-full"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;

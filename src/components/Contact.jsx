import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white underline decoration-red-600">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <input type="text" className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <input type="email" className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                <textarea rows="5" className="bg-gray-900 border border-red-600 rounded-lg text-white p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400" required></textarea>
              </div>
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white rounded-lg w-full py-3 font-semibold">
                Send Message
              </button>
            </form>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.146289102679!2d-73.98731968459113!3d40.76825497932791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1624891400000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl border-2 border-red-600 w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

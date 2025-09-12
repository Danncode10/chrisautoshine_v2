import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white underline decoration-red-600">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Get In Touch</h3>
            <p className="text-gray-300 mb-6">Ready to give your car the shine it deserves? Contact us today to schedule an appointment!</p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                  📞
                </div>
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                  📧
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-300">info@chrisautoshine.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white mr-4">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-white">Address</p>
                  <p className="text-gray-300">123 Auto Street, Shine City, SC 12345</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                <input type="text" className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-800 text-white placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
                <input type="email" className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-800 text-white placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Message</label>
                <textarea rows="5" className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-800 text-white placeholder-gray-400"></textarea>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-black hover:text-red-600 border border-red-600 font-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

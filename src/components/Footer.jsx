import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaTiktok} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Chris Auto Shine</h3>
            <p className="text-gray-300">Professional car wash and detailing services for all vehicles.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white">
              <li><a href="#home" className="hover:text-red-600 hover:underline">Home</a></li>
              <li><a href="#services" className="hover:text-red-600 hover:underline">Services</a></li>
              <li><a href="#packages" className="hover:text-red-600 hover:underline">Packages</a></li>
              <li><a href="#contact" className="hover:text-red-600 hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Exterior Wash</li>
              <li>Interior Detailing</li>
              <li>Waxing & Polishing</li>
              <li>Full Detailing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center">

              <a href="https://www.facebook.com/profile.php?id=61579380248722" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-2xl m-2" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-2xl m-2" />
              </a>
              <a href="https://www.tiktok.com/@malaykosayuwolf" target="_blank" rel="noopener noreferrer">
                <FaTiktok className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-2xl m-2" />
              </a>


            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Chris Auto Shine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

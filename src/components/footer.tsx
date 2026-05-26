import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { siteConfig } from "@/lib/config";

export function Footer() {
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
              {["home", "services", "packages", "about", "contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="hover:text-red-600 hover:underline capitalize">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Exterior Wash</li>
              <li>Interior Detailing</li>
              <li>Waxing &amp; Polishing</li>
              <li>Full Detailing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center gap-2">
              {siteConfig.socials.facebook && (
                <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-2xl" />
                </a>
              )}
              {siteConfig.socials.instagram && (
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-2xl" />
                </a>
              )}
              {siteConfig.socials.tiktok && (
                <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="text-gray-300 hover:text-red-600 transition-colors duration-300 text-2xl" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Chris Auto Shine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

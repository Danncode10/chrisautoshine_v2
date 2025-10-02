import React from 'react';
import { motion } from 'framer-motion';

function Packages() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="packages" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl text-red-600 font-bold text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Packages
        </motion.h2>

        {/* Exterior Packages */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-3xl text-white font-bold text-center mb-8"
            variants={itemVariants}
          >
            Exterior Packages
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {/* Auto 1 */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <h4 className="text-xl font-bold mb-4 text-center">Auto 1</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Snow Foam Wash + Exterior Windows</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Door Frames + Tire & Rim Shine</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Regular Exterior Cleaning</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$55</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$65</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$75</p>
                </div>
              </div>
            </motion.div>

            {/* Deluxe */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <h4 className="text-xl font-bold mb-4 text-center">Deluxe</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Foam Wash + Hand Wax</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Interior Quick Vacuum & Dust Wipe</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Tire & Rim Shine</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$160</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$180</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$200</p>
                </div>
              </div>
            </motion.div>

            {/* Super */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <h4 className="text-xl font-bold mb-4 text-center">Super</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Foam Wash + Single Stage Polish</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Spray Wax + Tire & Rim Shine</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Quick Interior Clean</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$245</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$295</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$345</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Interior Packages */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-3xl text-white font-bold text-center mb-8"
            variants={itemVariants}
          >
            Interior Packages
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {/* Plus */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <h4 className="text-xl font-bold mb-4 text-center">Plus</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Interior Vacuum + Dust Wipe</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Snow Foam Wash + Exterior Wipe</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Spray Wax + Rim Shine</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$105</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$125</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$145</p>
                </div>
              </div>
            </motion.div>

            {/* Deluxe */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <h4 className="text-xl font-bold mb-4 text-center">Deluxe</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Vacuum + Interior Panels Wipe</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Foam Wash + Spray Wax</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Tire & Rim Shine + 4 Doors Shampoo</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$160</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$180</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$200</p>
                </div>
              </div>
            </motion.div>

            {/* Super */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <h4 className="text-xl font-bold mb-4 text-center">Super</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Interior Shampoo + Steam Clean</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Leather Conditioner</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Foam Wash + Spray Wax</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$245</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$295</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$345</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Exclusive Packages */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-3xl text-white font-bold text-center mb-8"
            variants={itemVariants}
          >
            Exclusive Packages
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {/* Auto Elite */}
            <motion.div 
              className="bg-gradient-to-br from-red-900 to-gray-900 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Auto Elite</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Full Interior Care – Shampoo, Steam Clean, Air Blowing, Vacuum, Leather Conditioner</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Exterior Wash – Tires & Rims Cleaning + Spray Wax + Foam Wash</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Single Stage Polish – Removes light swirls for extra shine</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$395</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$475</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$545</p>
                </div>
              </div>
            </motion.div>

            {/* Auto Super Elite */}
            <motion.div 
              className="bg-gradient-to-br from-amber-900 to-gray-900 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Auto Super Elite</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Complete Interior – Shampoo, Steam Clean, Vacuum, Leather Conditioner</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Deep Exterior – Tar Removal, Clay Bar, Engine & Underchassis Cleaning</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>2-3 Stage Polish + Spray Wax – Professional finish & protection</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$999</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$1250</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$1500</p>
                </div>
              </div>
            </motion.div>

            {/* Exclusive Auto Elite */}
            <motion.div 
              className="bg-gradient-to-br from-purple-900 to-gray-900 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Exclusive Auto Elite</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Full Interior Care – Shampoo Wash, Steam Clean, Leather Conditioning</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Exterior Perfection – Snow Foam Hand Wash, Tires & Rims Deep Clean, 3-Stage Polish + Spray Wax</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Advanced Protection – Engine Bay Cleaning, Underbody Cleaning + Rust Protection</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$2500</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$2800</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$3250</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Truck Services & Pricing */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-3xl text-white font-bold text-center mb-8"
            variants={itemVariants}
          >
            Truck Services & Pricing
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {/* Bullbars Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Bullbars</h4>
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-300 mb-2 text-center">Sand & Polish</p>
                <ul className="space-y-3">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">4 Poster Bullbar</span>
                    <p className="text-2xl font-bold text-white">Starting at $990</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">5 Poster Bullbar</span>
                    <p className="text-2xl font-bold text-white">Starting at $1250</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Bumper</span>
                    <p className="text-2xl font-bold text-white">Starting at $550</p>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-300 mb-2 text-center">Cut & Polish</p>
                <ul className="space-y-3">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">4 Poster Bullbar</span>
                    <p className="text-2xl font-bold text-white">Starting at $495</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">5 Poster Bullbar</span>
                    <p className="text-2xl font-bold text-white">Starting at $625</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Bumper</span>
                    <p className="text-2xl font-bold text-white">Starting at $275</p>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Tanks Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Tanks</h4>
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-300 mb-2 text-center">Sand & Polish</p>
                <ul className="space-y-3">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Large Tank</span>
                    <p className="text-2xl font-bold text-white">Starting at $290</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Medium Tank</span>
                    <p className="text-2xl font-bold text-white">Starting at $250</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Small Tank</span>
                    <p className="text-2xl font-bold text-white">Starting at $200</p>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-300 mb-2 text-center">Cut & Polish</p>
                <ul className="space-y-3">
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Large Tank</span>
                    <p className="text-2xl font-bold text-white">Starting at $145</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Medium Tank</span>
                    <p className="text-2xl font-bold text-white">Starting at $125</p>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300">Small Tank</span>
                    <p className="text-2xl font-bold text-white">Starting at $100</p>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Other Parts Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Other Parts (Cut & Polish)</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Exhaust</span>
                  <p className="text-2xl font-bold text-white">Starting at $150</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Snorkel</span>
                  <p className="text-2xl font-bold text-white">Starting at $100</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Mirror</span>
                  <p className="text-2xl font-bold text-white">Starting at $50</p>
                </li>
              </ul>
            </motion.div>

            {/* Wheel Rims Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Wheel Rims</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Sand & Polish</span>
                  <p className="text-2xl font-bold text-white">Starting at $200 each</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Cut & Polish</span>
                  <p className="text-2xl font-bold text-white">Starting at $80 each</p>
                </li>
              </ul>
            </motion.div>

            {/* Interior Detailing Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Interior Detailing (Trucks)</h4>
              <p className="text-2xl font-bold text-white text-center">Starting at $250-500</p>
            </motion.div>

            {/* Full Vehicle Polish Card */}
            <motion.div 
              className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative md:col-span-2 lg:col-span-1"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Full Vehicle Polish</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">1 Stage Polish</span>
                  <p className="text-2xl font-bold text-white">Starting at $600</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">2 Stage Polish</span>
                  <p className="text-2xl font-bold text-white">$900</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">3 Stage Polish</span>
                  <p className="text-2xl font-bold text-white">Starting at $1250</p>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-green-400 text-xl font-semibold">💡 Prices depend on item quality. 🎉 First-time customers get 10% OFF!</p>
          </motion.div>
        </motion.div>

        {/* Additional Services */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 
            className="text-3xl text-white font-bold text-center mb-8"
            variants={itemVariants}
          >
            Additional Services
          </motion.h3>

          {/* Under Body Cleaning Promo */}
          <motion.div 
            className="mb-8 flex justify-center"
            variants={containerVariants}
          >
            <motion.div 
              className="bg-gray-800 text-white p-8 rounded-xl shadow-md max-w-md w-full text-center border border-gray-700"
              variants={itemVariants}
            >
              <h4 className="text-2xl font-bold mb-4">Under Body Cleaning</h4>
              <p className="text-xl font-semibold text-red-400">prices starting at $250</p>
            </motion.div>
          </motion.div>

          {/* Body Cleaning & Protection */}
          <motion.div 
            className="mb-8"
            variants={containerVariants}
          >
            <motion.h4 
              className="text-2xl text-white font-bold text-center mb-6"
              variants={itemVariants}
            >
              Under Body Cleaning & Protection
            </motion.h4>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Hatchback</h5>
                <p className="text-3xl font-bold text-white">$1400</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Sedan</h5>
                <p className="text-3xl font-bold text-white">$1600</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg md:col-span-2"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">UTE/7 Seater</h5>
                <p className="text-3xl font-bold text-white">$1750</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Paint Correction */}
          <motion.div 
            className="mb-8"
            variants={containerVariants}
          >
            <motion.h4 
              className="text-2xl text-white font-bold text-center mb-6"
              variants={itemVariants}
            >
              Paint Correction
            </motion.h4>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Single Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$395</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Two Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$595</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg md:col-span-2"
                variants={itemVariants}
              >
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Three Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$750</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Add-ons */}
          <motion.div 
            className="mb-8"
            variants={containerVariants}
          >
            <motion.h4 
              className="text-2xl text-white font-bold text-center mb-6"
              variants={itemVariants}
            >
              Add-ons
            </motion.h4>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <ul className="space-y-3">
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Tar Removal</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">$50–100</span></span>
                  </li>
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Pet Hair Removal</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">$50–100</span></span>
                  </li>
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Odour Treatment</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">$50</span></span>
                  </li>
                </ul>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg"
                variants={itemVariants}
              >
                <ul className="space-y-3">
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Per Panel Polish</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">$100</span></span>
                  </li>
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Headlight Restoration</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">$45</span></span>
                  </li>
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Red Dirt Removal</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">$100–150</span></span>
                  </li>
                  <li className="grid grid-cols-2 items-center gap-4 text-gray-300">
                    <span className="flex items-center"><span className="text-red-500 mr-2 font-bold">✓</span>Ceramic Coating</span>
                    <span className="text-right"><span className="text-2xl font-bold text-white">From $850</span></span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Packages;

import React from 'react';

function Packages() {
  return (
    <section id="packages" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-red-600 font-bold text-center mb-12">Packages</h2>

        {/* Exterior Packages */}
        <div className="mb-16">
          <h3 className="text-3xl text-white font-bold text-center mb-8">Exterior Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Auto 1 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Auto 1</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Basic exterior wash</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Wheel cleaning</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Tire shine</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$20</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$25</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$30</p>
                </div>
              </div>
            </div>

            {/* Deluxe */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Deluxe</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Pre-wash foam</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Hand wash</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Clay bar treatment</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Wax application</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$35</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$40</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$50</p>
                </div>
              </div>
            </div>

            {/* Super */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Super</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Full exterior detail</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Paint polish</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Protective sealant</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Wheel & tire detail</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$50</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$60</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$70</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interior Packages */}
        <div className="mb-16">
          <h3 className="text-3xl text-white font-bold text-center mb-8">Interior Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Plus */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Plus</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Vacuum seats & carpets</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Wipe down surfaces</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Air freshener</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$25</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$30</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$40</p>
                </div>
              </div>
            </div>

            {/* Deluxe */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Deluxe</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Deep vacuum & shampoo</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Seat & upholstery clean</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Leather conditioning</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Dashboard protection</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$40</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$45</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$60</p>
                </div>
              </div>
            </div>

            {/* Super */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Super</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Full interior steam clean</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Stain & odor removal</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Deep carpet extraction</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Headliner cleaning</li>
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
                  <p className="text-2xl font-bold text-white">$80</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exclusive Packages */}
        <div className="mb-16">
          <h3 className="text-3xl text-white font-bold text-center mb-8">Exclusive Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Auto Elite */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Auto Elite</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Deluxe Exterior + Interior</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Engine bay clean</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Premium wax</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$70</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$80</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$100</p>
                </div>
              </div>
            </div>

            {/* Auto Super Elite */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Auto Super Elite</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Super Exterior + Interior</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Ceramic coating prep</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Full vehicle protection</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>UV protection</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$100</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$110</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$130</p>
                </div>
              </div>
            </div>

            {/* Exclusive Auto Elite */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <h4 className="text-xl font-bold mb-4 text-center">Exclusive Auto Elite</h4>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Ultimate full detail</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Ceramic coating</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Paint correction</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Luxury interior restore</li>
                <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Complimentary pickup</li>
              </ul>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Hatchback</h5>
                  <p className="text-2xl font-bold text-white">$150</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">Sedan/UTE</h5>
                  <p className="text-2xl font-bold text-white">$160</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-300">7 Seater</h5>
                  <p className="text-2xl font-bold text-white">$180</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Truck Services & Pricing */}
        <div className="mb-16">
          <h3 className="text-3xl text-white font-bold text-center mb-8">Truck Services & Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bullbars Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Bullbars (Sand & Polish)</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">4 Poster Bullbar</span>
                  <p className="text-2xl font-bold text-white">Starting at $990</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">5 Poster Bullbar</span>
                  <p className="text-2xl font-bold text-white">Starting at $1250</p>
                </li>
              </ul>
            </div>

            {/* Tanks Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Tanks (Sand & Polish)</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Large Tank</span>
                  <p className="text-2xl font-bold text-white">$290</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Medium Tank</span>
                  <p className="text-2xl font-bold text-white">$250</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Small Tank</span>
                  <p className="text-2xl font-bold text-white">$200</p>
                </li>
              </ul>
            </div>

            {/* Other Parts Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Other Parts</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Exhaust</span>
                  <p className="text-2xl font-bold text-white">$150</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Snorkel</span>
                  <p className="text-2xl font-bold text-white">$100</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Mirror</span>
                  <p className="text-2xl font-bold text-white">$50</p>
                </li>
              </ul>
            </div>

            {/* Wheel Rims Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Wheel Rims</h4>
              <ul className="mb-6 space-y-3">
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Sand & Polish</span>
                  <p className="text-2xl font-bold text-white">$200 each</p>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-300">Cut & Polish</span>
                  <p className="text-2xl font-bold text-white">$80 each</p>
                </li>
              </ul>
            </div>

            {/* Interior Detailing Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Interior Detailing (Trucks)</h4>
              <p className="text-2xl font-bold text-white text-center">Starting at $250</p>
            </div>

            {/* Full Vehicle Polish Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative md:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
              <h4 className="text-xl font-bold mb-4 text-center">Full Vehicle Polish</h4>
              <p className="text-4xl font-bold text-white text-center">$1250</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-green-400 text-xl font-semibold">💡 Prices depend on item quality. 🎉 First-time customers get 10% OFF!</p>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h3 className="text-3xl text-white font-bold text-center mb-8">Additional Services</h3>

          {/* Body Cleaning & Protection */}
          <div className="mb-8">
            <h4 className="text-2xl text-white font-bold text-center mb-6">Body Cleaning & Protection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Hatchback</h5>
                <p className="text-3xl font-bold text-white">$1400</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Sedan</h5>
                <p className="text-3xl font-bold text-white">$1600</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg md:col-span-2">
                <h5 className="text-lg font-semibold text-gray-300 mb-2">UTE/7 Seater</h5>
                <p className="text-3xl font-bold text-white">$1750</p>
              </div>
            </div>
          </div>

          {/* Paint Correction */}
          <div className="mb-8">
            <h4 className="text-2xl text-white font-bold text-center mb-6">Paint Correction</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Single Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$395</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Two Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$595</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg md:col-span-2">
                <h5 className="text-lg font-semibold text-gray-300 mb-2">Three Stage Polish</h5>
                <p className="text-3xl font-bold text-white">$750</p>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-8">
            <h4 className="text-2xl text-white font-bold text-center mb-6">Add-ons</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Tar Removal — <span className="text-2xl font-bold text-white ml-2">$50–100</span></li>
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Pet Hair Removal — <span className="text-2xl font-bold text-white ml-2">$50–100</span></li>
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Odour Treatment — <span className="text-2xl font-bold text-white ml-2">$50</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Per Panel Polish — <span className="text-2xl font-bold text-white ml-2">$100</span></li>
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Headlight Restoration — <span className="text-2xl font-bold text-white ml-2">$45</span></li>
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Red Dirt Removal — <span className="text-2xl font-bold text-white ml-2">$100–150</span></li>
                  <li className="flex items-center text-gray-300"><span className="text-red-500 mr-2 font-bold">✓</span>Ceramic Coating — <span className="text-2xl font-bold text-white ml-2">From $850</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Packages;

import React from 'react';

function TruckServices() {
  return (
    <div className="mb-16">
      <h3 className="text-3xl text-white font-bold text-center mb-8">
        Truck Services & Pricing
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bullbars Sand & Polish Card */}
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
            <li className="flex flex-col">
              <span className="text-sm font-semibold text-gray-300">Bumper</span>
              <p className="text-2xl font-bold text-white">Starting at $550</p>
            </li>
          </ul>
        </div>

        {/* Bullbars Cut & Polish Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-2 rounded-t-lg mb-4"></div>
          <h4 className="text-xl font-bold mb-4 text-center">Bullbars (Cut & Polish)</h4>
          <ul className="mb-6 space-y-3">
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

        {/* Tanks Sand & Polish Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
          <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
          <h4 className="text-xl font-bold mb-4 text-center">Tanks (Sand & Polish)</h4>
          <ul className="mb-6 space-y-3">
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

        {/* Tanks Cut & Polish Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
          <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-2 rounded-t-lg mb-4"></div>
          <h4 className="text-xl font-bold mb-4 text-center">Tanks (Cut & Polish)</h4>
          <ul className="mb-6 space-y-3">
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

        {/* Other Parts Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
          <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
          <h4 className="text-xl font-bold mb-4 text-center">Other Parts</h4>
          <ul className="mb-6 space-y-3">
            <li className="flex flex-col">
              <span className="text-sm font-semibold text-gray-300">Exhaust (Cut & Polish)</span>
              <p className="text-2xl font-bold text-white">Starting at $150</p>
            </li>
            <li className="flex flex-col">
              <span className="text-sm font-semibold text-gray-300">Snorkel (Cut & Polish)</span>
              <p className="text-2xl font-bold text-white">Starting at $100</p>
            </li>
            <li className="flex flex-col">
              <span className="text-sm font-semibold text-gray-300">Mirror (Cut & Polish)</span>
              <p className="text-2xl font-bold text-white">Starting at $50</p>
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
              <p className="text-2xl font-bold text-white">Starting at $200 each</p>
            </li>
            <li className="flex flex-col">
              <span className="text-sm font-semibold text-gray-300">Cut & Polish</span>
              <p className="text-2xl font-bold text-white">Starting at $80 each</p>
            </li>
          </ul>
        </div>

        {/* Truck Interior Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative">
          <div className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-t-lg mb-4"></div>
          <h4 className="text-xl font-bold mb-4 text-center">Truck Interior</h4>
          <p className="text-2xl font-bold text-white text-center">Starting at $250</p>
        </div>

        {/* Full Vehicle Polish Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl relative md:col-span-2 lg:col-span-1">
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
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-green-400 text-xl font-semibold">💡 Prices depend on item quality. 🎉 First-time customers get 10% OFF!</p>
      </div>
    </div>
  );
}

export default TruckServices;

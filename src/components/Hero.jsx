import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="bg-black text-white py-20 min-h-screen flex items-center justify-center">
      <div className={`container mx-auto text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <img className="mx-auto mb-6 h-16 w-auto" src="/vite.svg" alt="Chris Auto Shine Logo" />
        <h2 className="text-5xl font-bold mb-4 text-white">Welcome to Chris Auto Shine</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">Professional car wash and detailing services to make your vehicle shine like new.</p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Hero;

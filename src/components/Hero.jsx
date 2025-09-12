import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="bg-black text-white py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4 text-white">Welcome to Chris Auto Shine</h2>
        <p className="text-xl mb-8 text-gray-200">Professional car wash and detailing services to make your vehicle shine like new.</p>
        <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-red-600 border border-red-600">
          Book Now
        </button>
      </div>
    </section>
  );
};

export default Hero;

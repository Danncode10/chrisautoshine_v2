import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Chris Auto Shine</div>
        <ul className="flex space-x-6">
          <li><a href="#home" className="text-white hover:text-red-600 hover:underline">Home</a></li>
          <li><a href="#services" className="text-white hover:text-red-600 hover:underline">Services</a></li>
          <li><a href="#packages" className="text-white hover:text-red-600 hover:underline">Packages</a></li>
          <li><a href="#about" className="text-white hover:text-red-600 hover:underline">About</a></li>
          <li><a href="#contact" className="text-white hover:text-red-600 hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

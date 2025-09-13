import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Chris Auto Shine</div>
        
        {/* Hamburger Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className="space-y-1">
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#home" className="text-white hover:text-red-600 hover:underline" onClick={() => setIsOpen(false)}>Home</a></li>
          <li><a href="#services" className="text-white hover:text-red-600 hover:underline" onClick={() => setIsOpen(false)}>Services</a></li>
          <li><a href="#packages" className="text-white hover:text-red-600 hover:underline" onClick={() => setIsOpen(false)}>Packages</a></li>
          <li><a href="#about" className="text-white hover:text-red-600 hover:underline" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#contact" className="text-white hover:text-red-600 hover:underline" onClick={() => setIsOpen(false)}>Contact</a></li>
        </ul>

        {/* Mobile Navigation */}
        <ul className={`md:hidden absolute top-full left-0 w-full bg-black p-4 shadow-md z-50 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col space-y-4">
            <li><a href="#home" className="text-white hover:text-red-600 hover:underline block py-2" onClick={() => setIsOpen(false)}>Home</a></li>
            <li><a href="#services" className="text-white hover:text-red-600 hover:underline block py-2" onClick={() => setIsOpen(false)}>Services</a></li>
            <li><a href="#packages" className="text-white hover:text-red-600 hover:underline block py-2" onClick={() => setIsOpen(false)}>Packages</a></li>
            <li><a href="#about" className="text-white hover:text-red-600 hover:underline block py-2" onClick={() => setIsOpen(false)}>About</a></li>
            <li><a href="#contact" className="text-white hover:text-red-600 hover:underline block py-2" onClick={() => setIsOpen(false)}>Contact</a></li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

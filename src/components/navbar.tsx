"use client";

import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Chris Auto Shine</div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none border-none bg-transparent p-0"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className="space-y-1">
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-0.5" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-0.5" : ""}`}
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {["home", "services", "packages", "about", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="text-white hover:text-red-600 hover:underline capitalize"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <ul
          className={`md:hidden absolute top-full left-0 w-full bg-black p-4 shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-4">
            {["home", "services", "packages", "about", "contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="text-white hover:text-red-600 hover:underline block py-2 capitalize"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </nav>
  );
}

import React from 'react';

const Services = () => {
  return (
    <section id="services" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white underline decoration-red-600">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-red-600">
            <h3 className="text-2xl font-semibold mb-4 text-white">Exterior Wash</h3>
            <p className="text-gray-300">Thorough cleaning of the exterior to remove dirt, grime, and contaminants.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-red-600">
            <h3 className="text-2xl font-semibold mb-4 text-white">Interior Detailing</h3>
            <p className="text-gray-300">Deep clean of seats, carpets, dashboard, and all interior surfaces.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-red-600">
            <h3 className="text-2xl font-semibold mb-4 text-white">Waxing & Polishing</h3>
            <p className="text-gray-300">Protective wax application and polishing for a showroom shine.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

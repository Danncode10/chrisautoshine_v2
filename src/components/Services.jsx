import React from 'react';

import ServiceCard from './ServiceCard';

const Services = () => {
  const servicesData = [
    {
      title: 'Exterior Wash',
      description: 'Thorough cleaning of the exterior to remove dirt, grime, and contaminants.'
    },
    {
      title: 'Interior Detailing',
      description: 'Deep clean of seats, carpets, dashboard, and all interior surfaces.'
    },
    {
      title: 'Waxing & Polishing',
      description: 'Protective wax application and polishing for a showroom shine.'
    }
  ];

  return (
    <section id="services" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-red-600 font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

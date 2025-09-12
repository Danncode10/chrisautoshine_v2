import React from 'react';

import PackageCard from './PackageCard';
import ServiceCard from './ServiceCard';

const Packages = () => {
  const packagesData = [
    {
      id: 'car-wash',
      title: 'Basic Car Wash',
      description: 'Quick exterior wash and dry.',
      price: '$20',
      features: ['Hand wash', 'Wheel cleaning', 'Tire shine']
    },
    {
      id: 'interior',
      title: 'Interior Detailing',
      description: 'Complete interior clean including vacuum and wipe down.',
      price: '$50',
      features: ['Vacuum seats & carpets', 'Dashboard clean', 'Window interior']
    },
    {
      id: 'exclusive',
      title: 'Exclusive Package',
      description: 'Full exterior and interior detailing with premium products.',
      price: '$100',
      features: ['Full wash & wax', 'Interior deep clean', 'Leather conditioning']
    }
  ];

  const truckServices = [
    {
      title: 'Engine Bay Clean',
      description: 'Thorough cleaning of the engine compartment to remove grease, dirt, and grime for better performance and appearance. Part of the $80 Truck/SUV Package.'
    },
    {
      title: 'Undercarriage Wash',
      description: 'High-pressure wash to remove mud, salt, and debris from the underbody, preventing corrosion. Included in the $80 Truck/SUV Package.'
    },
    {
      title: 'Heavy-Duty Interior',
      description: 'Robust cleaning tailored for truck interiors, handling heavy wear and stains effectively. Part of the $80 Truck/SUV Package.'
    }
  ];

  const additionalServices = [
    {
      title: 'Clay Bar Treatment',
      description: 'Removes embedded contaminants from the paint surface for a smoother finish and better wax adhesion. Starting at $10.'
    },
    {
      title: 'Headlight Restoration',
      description: 'Restores clarity to foggy or oxidized headlights, improving visibility and aesthetics. Starting at $10.'
    },
    {
      title: 'Odor Elimination',
      description: 'Professional treatment to eliminate stubborn odors using ozone or enzyme cleaners. Starting at $10.'
    }
  ];

  return (
    <section id="packages" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-red-600 font-bold text-center mb-12">Our Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => (
            <PackageCard
              key={pkg.id}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              features={pkg.features}
            />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-4xl text-red-600 font-bold text-center mb-12">Truck Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {truckServices.map((service, index) => (
              <ServiceCard key={index} title={service.title} description={service.description} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-4xl text-red-600 font-bold text-center mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <ServiceCard key={index} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;

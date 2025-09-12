import React from 'react';

import PackageCard from './PackageCard';

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
    },
    {
      id: 'truck',
      title: 'Truck/SUV Package',
      description: 'Specialized cleaning for larger vehicles.',
      price: '$80',
      features: ['Engine bay clean', 'Undercarriage wash', 'Heavy-duty interior']
    },
    {
      id: 'add-ons',
      title: 'Add-ons',
      description: 'Optional extras to enhance your service.',
      price: 'Starting at $10',
      features: ['Clay bar treatment', 'Headlight restoration', 'Odor elimination']
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
      </div>
    </section>
  );
};

export default Packages;

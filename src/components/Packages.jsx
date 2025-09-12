import React from 'react';

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
        <h2 className="text-4xl font-bold text-center mb-12 text-white underline decoration-red-600">Our Packages</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg) => (
            <div key={pkg.id} className="bg-gray-900 p-6 rounded-lg shadow-md border border-red-600">
              <h3 className="text-2xl font-semibold mb-4 text-white">{pkg.title}</h3>
              <p className="text-gray-300 mb-4">{pkg.description}</p>
              <div className="mb-4">
                {pkg.features.map((feature, index) => (
                  <p key={index} className="text-sm text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    {feature}
                  </p>
                ))}
              </div>
              <div className="text-3xl font-bold text-red-600 mb-4">{pkg.price}</div>
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-black hover:text-red-600 border border-red-600">
                Select Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;

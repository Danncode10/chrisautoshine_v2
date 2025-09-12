import React from 'react';

const PackageCard = ({ title, description, price, features }) => {
  return (
    <div className="bg-black p-6 rounded-lg shadow-md border border-red-600 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="mb-4">
          {features.map((feature, index) => (
            <p key={index} className="text-sm text-gray-300 flex items-center">
              <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
              {feature}
            </p>
          ))}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-red-600 mb-4">{price}</div>
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-black hover:text-red-600 border border-red-600">
          Select Package
        </button>
      </div>
    </div>
  );
};

export default PackageCard;

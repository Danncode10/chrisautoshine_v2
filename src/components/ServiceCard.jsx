import React from 'react';

const ServiceCard = ({ title, description }) => {
  return (
    <div className="bg-black p-6 rounded-lg shadow-md border border-red-600 flex flex-col justify-between h-full">
      <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default ServiceCard;

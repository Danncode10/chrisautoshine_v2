import React from 'react';

const ServiceCard = ({ title, description }) => {
  return (
    <div className="bg-black border border-red-600 rounded-xl p-6 text-white shadow-md flex flex-col justify-between h-full hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-white">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default ServiceCard;

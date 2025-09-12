import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc, altText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-black text-white border border-red-600 rounded-xl p-6 max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl"
        >
          ×
        </button>
        <img src={imageSrc} alt={altText} className="w-full h-auto rounded" />
      </div>
    </div>
  );
};

export default Modal;

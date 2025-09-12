import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc, altText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-gray-900 p-4 rounded-lg max-w-4xl max-h-full overflow-auto border border-red-600">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-600 text-2xl"
        >
          ×
        </button>
        <img src={imageSrc} alt={altText} className="w-full h-auto rounded" />
      </div>
    </div>
  );
};

export default Modal;

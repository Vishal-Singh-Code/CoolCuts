import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold">Appointment Details</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-700 text-3xl pr-2 pl-2 pb-1 m-0 rounded-full bg-gray hover:bg-gray-300 focus:outline-none  transition-colors duration-300"
            aria-label="Close"
          >
            &times;
          </button>

        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

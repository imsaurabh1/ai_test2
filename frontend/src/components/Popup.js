//Popup component

import React from 'react';

const Popup = ({ message, isError, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`bg-white border rounded-lg shadow-lg p-6 ${isError ? 'border-red-500' : 'border-green-500'}`}>
        <h3 className={`text-lg font-semibold ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {isError ? 'Error' : 'Success'}
        </h3>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

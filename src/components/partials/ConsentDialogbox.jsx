// ConsentDialog.js
import React, { useState } from 'react';

const ConsentDialog = ({ onConfirm, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true); // Set loading state
    await onConfirm(); // Call the onConfirm function
    setIsLoading(false); // Reset loading state after the confirmation is processed
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Consent Required</h2>
        <p className="mt-2">Do you want to send the video?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2 bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending...
              </span>
            ) : (
              'Yes, Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentDialog;
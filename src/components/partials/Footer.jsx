import React from "react";
import { Link, Links } from "react-router-dom";

import { useState } from "react";

const Footer = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const renderServiceModal = () => {
    if (!selectedService) return null;

    let serviceContent;
    switch (selectedService) {
      case "Text-2-Speech Conversion":
        serviceContent = "Automatically convert your written text into high-quality, natural-sounding audio. Perfect for creating audiobooks, voiceovers, and more.";
        break;
      case "Speech-2-Text":
        serviceContent = "Effortlessly transcribe spoken words into text. Ideal for meeting notes, interviews, and transcribing video content.";
        break;
      case "Background Change":
        serviceContent = "Customize the background of your videos with ease. Enhance your content with professional-looking backgrounds.";
        break;
      default:
        serviceContent = "";
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">{selectedService}</h2>
          <p className="mb-4 text-gray-700">{serviceContent}</p>
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-blue-500 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 px-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Aivideo Recorder</h2>
          <p className="mb-4">
            Aivideo Recorder offers an intuitive experience that automatically converts text to high-quality audio and precisely lip-syncs it with your videos. Download Aivideo Recorder today and let your creativity flow!
          </p>
          <div className="flex space-x-4">
            <div className="relative group">
              <Link
                to="https://x.com/NixiesIndia"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-blue-500 group-hover:bg-blue-300 group-hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
            <div className="relative group">
              <Link
                to="https://www.facebook.com/nixiesIndia"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-blue-500 group-hover:bg-blue-800 group-hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
            </div>
            <div className="relative group">
              <Link
                to="https://www.youtube.com/channel/UC0glDU_wHMnvx9bbqNGm_ow"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-blue-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
            <div className="relative group">
              <Link
                to="https://www.linkedin.com/company/nixies-india-technologies-llp/"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-blue-500 group-hover:bg-blue-300 group-hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Our Services</h3>
          <ul className="list-disc list-inside cursor-pointer">
            <li className="mb-2" onClick={() => handleServiceClick("Text-2-Speech Conversion")}>Text-2-Speech Conversion</li>
            <li className="mb-2" onClick={() => handleServiceClick("Speech-2-Text")}>Speech-2-Text</li>
            <li className="mb-2" onClick={() => handleServiceClick("Background Change")}>Background Change</li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">
            <strong>Address:</strong> 301 Lakeview Apartment, Shapura, Near Bansal Hospital, Bhopal.
          </p>
          <p className="mb-2">
            <strong>Website:</strong> <a href="https://nixiesindia.com" className="text-blue-200 hover:underline">nixiesindia.com</a>
          </p>
          <p className="mb-2">
            <strong>Email:</strong> <a href="mailto:info@nixiesindia.com" className="text-blue-200 hover:underline">info@nixiesindia.com</a>
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> +91 - 8462006255
          </p>
          <p className="mb-2">
            <strong>Fax:</strong> +91 0755-4928542
          </p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Nixies India Technologies LLP. All rights reserved.</p>
      </div>
      {renderServiceModal()}
    </footer>
  );
};

export default Footer;






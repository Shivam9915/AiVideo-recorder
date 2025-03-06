import React, { useState } from "react";
import Navbar from "./Navbar"; // Adjust the import based on your file structure
import Footer from "./Footer"; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";
import { useVideo } from "../../context/VideoContext";
import { useConsent } from "../../context/ConsentContext";

const TermsAndConditions = () => {
  const { recordedVideo } = useVideo(); // Use the context
  const {consent,setConsent} = useConsent();
  const [error, setError] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const navigate = useNavigate();
  
  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
    setError(""); // Clear error when user interacts with checkbox
  };

  const handleAccept = () => {
    if (!consent) {
      setError("You must agree to the terms and conditions before proceeding.");
      return;
    }
    // Set the overlay message and show the overlay
    setOverlayMessage("You have accepted the terms and conditions.");
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setOverlayMessage("");
    navigate(-1); // Navigate to the next step
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <Navbar
          profilePicture="https://placehold.co/40x40" // Replace with your profile picture logic
          onProfilePictureClick={() => {}}
          onFileChange={() => {}}
          isMobileNavOpen={false}
          toggleMobileNav={() => {}}
        />
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <p className="mb-4">
            By using this application, you agree to the following terms and conditions. Please read them carefully before giving your consent.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your video and audio will be recorded for the purposes outlined in this application.</li>
            <li>The recorded media may be used for analysis, processing, and other purposes related to the application's functionality.</li>
            <li>We will take reasonable measures to ensure the security and confidentiality of your recorded media.</li>
            <li>You have the right to revoke your consent at any time by contacting us.</li>
          </ul>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={consent}
                onChange={handleConsentChange}
                className="form-checkbox text-gray-600"
              />
              <span className="ml-2">I agree to the terms and conditions</span>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-900 text-white px-6 py-2 rounded"
              onClick={handleAccept}
              disabled={!consent}
            >
              Accept
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform">
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p>{overlayMessage}</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={closeOverlay}>
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default TermsAndConditions ;

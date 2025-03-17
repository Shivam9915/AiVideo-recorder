import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import baseUrl from '../store.json'
import Navbar from "./partials/Navbar";
import {BASE_URL} from '../store.json'

const PreviewText = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading status
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const location = useLocation();
  const { text} = location.state || {}; // Destructure the state
  const video = localStorage.getItem("videourl")
  const gender = localStorage.getItem("gender")
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();
      const [profilePicture, setProfilePicture] = useState(
            "https://placehold.co/40x40"); // Default profile picture
         const [fileInputVisible, setFileInputVisible] = useState(false);
          const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility
        
          // Profile picture functions
          const handleProfilePictureClick = () => {
            setFileInputVisible(true);
          };
        
          const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setProfilePicture(reader.result); // Update profile picture
                setFileInputVisible(false); // Hide file input after selection
              };
              reader.readAsDataURL(file);
            }
          };
        
          const toggleMobileNav = () => {
            setIsMobileNavOpen(!isMobileNavOpen); // Toggle mobile navbar visibility
          };
  
  console.log(video,text)


  const handleback = () => {
    navigate(navigate(-1))
  }


  // Function to handle video generation
  const handleGenerateVideo = async () => {
    if (!text || !video) {
      console.error("Generated text or video URL is missing.");
      return;
    }
    setLoading(true);
  
     // Create a FormData object
  const formData = new FormData();
  formData.append('text', text); // Append text
  formData.append('video', video); // Append video
  formData.append("user_id",userId)
  formData.append("gender", gender);
  console.log(gender)


  try {
    const response = await axios.post(`${baseUrl.API_URL}/generate_audio`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const data = response.data; // Assuming the API returns a response
    if(data){

      setMessage("Video generated successfully");
      setLoading(false);
      console.log(data)
      navigate(BASE_URL+"/trainedvideos")
    }
    // Handle success (e.g., navigate to another page or show a success message)
  } catch (error) {
    setError("Error generating video"); // Handle error (e.g., show an error message)
    setLoading(false); // Reset loading state

  }
};

  return (
    <div className="preview-text">
                  <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="absolute left-0 top-20 w-full p-4">
          <Link to={BASE_URL+'/AiGenerate1'} className="mr-4">
            <i  className="fas fa-arrow-left text-2xl text-black hover:text-blue-900"></i>{" "}
            {/* Back arrow icon */}
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center p-6 rounded-lg w-full max-w-md">
          <h2 className="text-[20px] font-[600] flex">Preview Text</h2>
          <div className="bg-white p-4 rounded-lg border border-gray-900 mt-2">
            <p className="text-gray-500 min-w-80 min-h-40">
             {text}
            </p>
          </div>
        </div>
        <button
            onClick={handleGenerateVideo}
              type="submit"
              className="w-[50vh] p-2 text-white bg-black rounded mt-1 mb-2"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate video"
              )}
            </button>
            {message && <p className="flex items-center justify-center text-green-700">{message}</p>}
            {error && <p className="flex items-center justify-center text-red-700">{error}</p>}
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300"
            onClick={() => setIsNavOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 bg-white w-64 p-4 z-20 transition-transform duration-300 transform translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Navigation</h2>
                <i
                  className="fas fa-times text-2xl cursor-pointer"
                  onClick={() => setIsNavOpen(false)}
                ></i>
              </div>
              <nav className="flex flex-col h-full">
                <Link
                  to={BASE_URL+"/trainedvideos"}
                  className="mb-4 text-md font-semibold text-gray-700 flex items-center"
                >
                  <i className="fas fa-video mr-3 text-gray-500"></i> Trained
                  Videos
                </Link>
                <Link
                  to={BASE_URL+"templates"}
                  className="mb-4 text-md font-semibold text-gray-700 flex items-center"
                >
                  <i className="fas fa-file-alt mr-6 text-gray-500"></i>{" "}
                  Templates
                </Link>
                <Link
                  to={BASE_URL+"/compositions"}
                  className="mb-4 text-md font-semibold text-gray-700 flex items-center"
                >
                  <i className="fas fa-layer-group text-gray-500 mr-3"></i>{" "}
                  Compositions
                </Link>
                <Link to={+BASE_URL+"/create-video"}>
                  <button className="w-full py-3 bg-black text-white rounded-md font-semibold">
                    + Create Video
                  </button>
                </Link>
                <div className="mt-[55vh]">
                  <Link
                    to={+BASE_URL+"/login"}
                    className="text-lg font-semibold text-red-500 flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewText;

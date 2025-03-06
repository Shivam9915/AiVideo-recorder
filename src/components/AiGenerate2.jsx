import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./partials/Navbar";

const AiGenerate2 = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading status
  const userId = localStorage.getItem("userId");

  const { article, prompt } = location.state; // Destructure the state
  const gender = localStorage.getItem("gender");
  const video = localStorage.getItem("videourl");
  console.log(prompt, video, article);

  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/40x40"
  ); // Default profile picture
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

  const handleUploadClick = () => {
    document.getElementById("file-input").click();
  };

  const handleRegenerateText = () => {
    navigate(-1);
  };

  const handleGenerateVideo = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading to true

    const formData = new FormData();
    formData.append("video", video); // Append the video (ensure it's a File object)
    formData.append("text", article); // Append the prompt
    formData.append("user_id", userId); // Append the userId
    formData.append("gender", gender);

    try {
      const response = await axios.post(
        "http://192.168.1.14:5000/api/generate_aiaudio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      const data = response.data;
      if (data) {
        setLoading(false);
        console.log(data);
        navigate("/trainedvideos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-red-600 h-screen">
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />

      <form className="pt-24 p-4 bg-gradient-to-t from-blue-200 to-white h-full overflow-y-auto">
        <div className="mb-2 w-full md:w-1/2 mx-auto">
          <label className="block text-[#4C4C50] text-lg md:text-2xl font-semibold mb-2">
            Write Prompt
          </label>
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500"
            rows="3"
            placeholder=""
            value={prompt}
            readOnly
          ></textarea>
        </div>
        <button
          onClick={handleRegenerateText}
          type="button"
          className="w-full md:w-1/2 ml-0 md:ml-[25%] bg-blue-500 text-white text-base md:text-lg py-2 rounded-lg mb-6"
        >
          Regenerate Text
        </button>
        <div className="mb-2 w-full md:w-1/2 mx-auto flex flex-col min-h-32">
          <label className="block text-[#4C4C50] text-lg md:text-2xl font-semibold mb-2">
            Preview Text
          </label>
          <textarea
            className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500"
            rows="6"
            cols="50"
            placeholder=""
            
          >{article}</textarea>
        </div>
        <button
          onClick={handleGenerateVideo}
          type="submit"
          className="w-full md:w-1/2 ml-0 md:ml-[25%] p-2 text-white text-base md:text-lg bg-blue-500 rounded mt-1 mb-2"
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
      </form>
    </div>
  );
};

export default AiGenerate2;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../store.json";
import Navbar from "./partials/Navbar";

const AiGenerate = () => {
  const [text, setText] = useState(""); // State for text input
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading status
  const navigate = useNavigate();
  const location = useLocation();
  const video = location.state?.video;
  console.log(video);
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

  const handleGenerateText = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text); // Append text input
    // formData.append("video", video); // Append video (assuming it's a file or blob)

    try {
      const response = await axios.post(
        `${baseUrl.API_URL}/generate_news`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data; // Assuming the API returns a response
      if (data) {
        setLoading(false);
        navigate("/AiGenerate2", {
          state: { article: data.news_article, prompt: data.text, video },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative">
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />

      <div className="flex flex-col items-center justify-center min-h-screen pt-[15%] md:justify-start bg-gradient-to-t from-blue-200 to-white">
        <div className="absolute top-16 w-full p-4">
          <Link to="/create-video" className="mr-4">
            <i className="fas fa-arrow-left text-2xl text-black hover:text-blue-900"></i>{" "}
            {/* Back arrow icon */}
          </Link>
        </div>

        <div className="w-full max-w-md p-4">
          <label className="block mb-2 text-lg font-medium">Write Prompt</label>
          <textarea
            className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Write Your Text Here"
            value={text} // Bind the textarea value to state
            onChange={(e) => setText(e.target.value)} // Update state on change
          ></textarea>
          <button
            onClick={handleGenerateText}
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded mt-1 mb-2"
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
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                  />
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
        </div>
      </div>
    </div>
  );
};

export default AiGenerate;

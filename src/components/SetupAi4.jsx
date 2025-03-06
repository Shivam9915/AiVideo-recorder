import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import { useVideo } from "../context/VideoContext";


const SetupAi4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {videourl  } = location.state
  console.log(videourl)
  localStorage.setItem('videourl',videourl)

    // const { recordedVideo } = useVideo();
    // const [userInitial, setUserInitial] = useState("");
    // console.log(recordedVideo)
  
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

  const handleFirstVideo = () => {
    navigate("/create-video",{state:videourl});
    
    
  };

  return (
<>
<div className="min-h-screen bg-zinc-200 flex flex-col items-center bg-gradient-to-t from-blue-200 to-white ">
                          <Navbar 
        profilePicture={profilePicture} 
        onProfilePictureClick={handleProfilePictureClick} 
        onFileChange={handleFileChange} 
        isMobileNavOpen={isMobileNavOpen} 
        toggleMobileNav={toggleMobileNav} 
      />
      
      <div className="  mt-16 w-full max-w-md mx-auto text-center flex flex-col items-center justify-center p-8 rounded-lg ">
        <img src="/src/assets/checkmark.png" alt="" />
        <p className="mt-4 text-lg text-zinc-800 font-[500] w-[85%]">
          Your AI Model Setup Has Been Completed Successfully
        </p>
        <button
          onClick={handleFirstVideo}
          className="mt-8 bg-blue-500 text-white py-2 px-4 rounded-md text-md font-[700]"
        >
          + Create Your First Video
        </button>
      </div>
    </div>
    <Footer/>
</>
  );
};

export default SetupAi4;

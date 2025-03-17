// AiBot.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import { BASE_URL } from "../store.json";

const AiBot = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("https://placehold.co/40x40"); // Default profile picture
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility
    // const [userInitial, setUserInitial] = useState("");
  


      useEffect(() => {
      const id =localStorage.getItem('userId');
      if(!id){
        navigate(BASE_URL+'/login')
      }
      else{
        return;
      }
      
      }, [])


  const handleCameraClick = async () => {
    navigate(BASE_URL+"/Ai-Setup2"); // Redirect to setupAi2 page
  };

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

  return (
<>
<div className="w-full flex flex-col items-center justify-between min-h-screen relative bg-gray-800">
      <Navbar 
        profilePicture={profilePicture} 
        onProfilePictureClick={handleProfilePictureClick} 
        onFileChange={handleFileChange} 
        isMobileNavOpen={isMobileNavOpen} 
        toggleMobileNav={toggleMobileNav} 
      />
      <div className="flex items-center justify-center flex-grow h-screen mt-16"> {/* Added margin-top to avoid overlap with navbar */}

      <main className="flex flex-col items-center justify-center flex-grow  h-screen mt-16"> {/* Added margin-top to avoid overlap with navbar */}
       
        <div
          className="bg-[#EAf6f6] p-10 rounded-full mb-4 cursor-pointer border-[2px]"
          onClick={handleCameraClick} // Redirect on click
        >
          <i className="fas fa-camera text-4xl"></i>
        </div>
        <p className="text-center text-zinc-400 mb-2 w-[80%] font-[500] text-[20px]">
          Click on the Button to Train Your Model
        </p>
      </main> 
      </div>
    </div>
        <Footer />
</>
  );
};

export default AiBot;
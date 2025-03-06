import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import Navbar from "./partials/Navbar";
import { useVideo } from "../context/VideoContext";

const CreateVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const location = useLocation();
  const { recordedVideo } = useVideo();
  const userId = localStorage.getItem("userId");
  const gender =  localStorage.getItem("gender")
  const navigate = useNavigate();
  // console.log(location.state);
const videourl = localStorage.getItem("videourl")  
  

  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/40x40"
  ); // Default profile picture
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility
;

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Uploaded file:", file); // Log the uploaded file

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("text", file); // Append the file to the FormData object
      formData.append("video", videourl); // Append the videourl to the FormData object
      formData.append("user_id", userId);
      formData.append("gender", gender);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      try {
        // Send the file to the API
        const response = await axios.post(
          "http://192.168.1.14:5000/api/upload_text",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/trainedvideos")
        localStorage.removeItem("videourl");
        localStorage.getItem("gender");
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleWriteText = () => {
    navigate("/writeText"); // pass videourl
  };

  const handleRecordAudio = () => {
    navigate("/audio-recording");
    
  };

  const handleAiGenerate = () => {
    navigate("/AiGenerate1"); // pass videourl
  };
useEffect(()=>{
 
  
  localStorage.setItem("videourl",videourl)

},[])
console.log(videourl);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center bg-gradient-to-b from-blue-300 to-white">
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />

      <main className="flex flex-wrap justify-center mt-32 gap-4 overflow-hidden">
        <div
          onClick={handleWriteText}
          className="bg-[#E6F7F7] w-36 h-36 flex flex-col justify-center items-center rounded-lg"
        >
          <i className="fas fa-book text-3xl mb-2 text-[#141b34] "></i>
          <p className="text-center font-[600]">Write Text</p>
        </div>

        <div
          className="bg-[#E6F7F7] w-36 h-36 flex flex-col justify-center items-center rounded-lg cursor-pointer"
          onClick={handleUploadClick}
        >
          <i className="fas fa-upload text-3xl mb-2 text-[#141b34]"></i>
          <p className="text-center font-[600]">File Upload</p>
          <input
            type="file"
            id="file-input"
            accept=".txt, .mp3, .wav, .mp4, .avi" // Accept text, audio, and video files
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <div
          onClick={handleRecordAudio}
          className="bg-[#E6F7F7] w-36 h-36 flex flex-col justify-center items-center rounded-lg"
        >
          <i className="fas fa-microphone text-3xl mb-2 text-[#141b34]"></i>
          <p className="text-center font-[600]">Record Audio</p>
        </div>

        <div
          onClick={handleAiGenerate}
          className="bg-[#E6F7F7] w-36 h-36 flex flex-col justify-center items-center rounded-lg"
        >
          <i className="fas fa-robot text-3xl mb-2 text-[#141b34]"></i>
          <p className="text-center font-[600]">AI Generate</p>
        </div>
      </main>
    </div>
  );
};

export default CreateVideo;

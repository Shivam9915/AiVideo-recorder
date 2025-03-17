import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import RecordingDots from "../../RecordingDots"; // Ensure this component is correctly imported
import Navbar from "./partials/Navbar";
import {BASE_URL} from '../store.json'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const video = localStorage.getItem("videourl")
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

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Could not access the microphone. Please check your permissions."
        );
      }
    }
  };
  const handleprevious = ()=>{
    navigate(-1);
  }

  const handleNext = () => {
    if (audioBlob) {
      const audioFile = new File([audioBlob], "recorded-audio.wav", {
        type: "audio/wav",
      });
      navigate(BASE_URL+"/preview-audio", { state: { audioFile, video } });
    } else {
      alert("Please record audio before proceeding.");
    }
  };

  return (
    <div className="bg-[#E6F2F2] min-h-screen flex flex-col relative">
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="w-full max-w-screen bg-[#E6F2F2] p-4 rounded-b-lg shadow-md relative">
        <div className="absolute left-0  top-16 w-full p-4">
          <button onClick={handleprevious} className="mr-4">
            <i className="fas fa-arrow-left text-2xl text-black hover:text-blue-900"></i>{" "}
            {/* Back arrow icon */}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start pt-[12%] flex-grow bg-gradient-to-t from-blue-200 to-white p-6 md:justify-start">
        <div className="w-full max-w-md text-center">
          <p className="text-gray-900 mb-4">Record Audio</p>
          <div className="mb-4">
            <button
              className="px-5 py-2 bg-gray-800 text-white rounded"
              onClick={toggleRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            <RecordingDots isRecording={isRecording} />
          </div>
          <button
            className="w-full px-5 py-2 bg-gray-800 text-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;

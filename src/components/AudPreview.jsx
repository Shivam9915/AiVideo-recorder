import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../store.json';
import Navbar from "./partials/Navbar";

const AudPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const audioFile = location.state?.audioFile; // Get the audio file from location state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(""); // State to hold the audio URL
    const video = localStorage.getItem("videourl"); // Access the video ID
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

  const handleRecordAgain = () => {
    navigate('/audio-recording');
    
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleGenerateText = async () => {
    if (!audioFile) return; // Ensure there's an audio file

    setLoading(true);
    const formData = new FormData();
    formData.append('audio', audioFile); // Append the audio file to FormData
    
    // Loop through FormData using forEach
         // Loop through FormData using forEach
       formData.forEach((value, key) => {
       console.log(`${key}: ${value}`);
     });

    try {
      const response = await axios.post(`${API_URL}/extracted_text`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const data = response.data; // Assuming the API returns an object with a 'text' property
     console.log(data)
    
      navigate('/preview-text',{state:{text:data.text,video}}); // Navigate to the preview text page
      // console.log(video)
    } catch (error) {
      console.error('Error generating text:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Create an object URL for the audio file
    if (audioFile) {
      
      const url = URL.createObjectURL(audioFile);
      setAudioUrl(url);
    }

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
      // Revoke the object URL when the component unmounts
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioFile]);

  return (
    <div className="relative">
                  <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="w-full max-w-screen bg-[#E6F2F2] p-4 rounded-b-lg shadow-md fixed top-0 z-10">
      <div className="absolute left-0 top-20 w-full p-4">
          <button className="mr-4">
            <i className="fas fa-arrow-left text-2xl text-black hover:text-blue-900"></i>{" "}
            {/* Back arrow icon */}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-white">
        <div className="p-6 text-center">
          <h2 className="text-gray-600 mb-4">Preview Audio</h2>
          {audioUrl ? ( // Use audioUrl instead of audioBlob
            <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} // Use onTimeUpdate prop
/>
          ) : (
            <p className="mb-3 text-gray-900">No audio recorded.</p>
          )}
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer" onClick={togglePlayPause}>
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'} text-white text-3xl`}></i>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-3/4 h-1 bg-gray-300 rounded-full relative">
              <div
                className="h-1 bg-gray-800 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <button
            onClick={handleGenerateText}
            type="submit"
            className="w-full p-2 text-white bg-gray-800 rounded mt-1 mb-2"
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
              "Generate Text"
            )}
          </button>          
          <button onClick={handleRecordAgain} className="w-full text-gray-500 py-2 hover:text-gray-800">
            Record Audio Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudPreview;
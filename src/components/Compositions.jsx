import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./partials/Navbar";
import axios from "axios";
import { API_URL, API } from "../store.json";
import Footer from "./partials/Footer";
import ReactPlayer from 'react-player'; // Import ReactPlayer

const Compositions = () => {
  const [compositions, setCompositions] = useState([]);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const [currentComposition, setCurrentComposition] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // State to control video playback
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation overlay

  const optionsMenuRef = useRef(null); // Ref for the options menu
  const playerRef = useRef(null); // Ref for the video player

  useEffect(() => {
    const fetchCompositions = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `${API_URL}/fetch_bg_videos/${userId}`
        );
        setCompositions(response.data);
      } catch (error) {
        console.error("Error fetching compositions:", error);
      }
    };

    fetchCompositions();
  }, []);

  const handleOptionsMenuToggle = (composition) => {
    setCurrentComposition(composition);
    setOptionsMenuVisible(!optionsMenuVisible);
  };

  const handleDeleteComposition = () => {
    setShowDeleteConfirmation(true); // Show confirmation overlay
  };

  const confirmDelete = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("filename", currentComposition.filename);
    formData.append("user_id", userId);

    try {
      const response = await axios.put(`${API_URL}/delete_bg_video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setCompositions(
        compositions.filter(
          (composition) => composition.filename !== currentComposition.filename
        )
      );
      setOptionsMenuVisible(false);
      setCurrentComposition(null);
      setShowDeleteConfirmation(false); // Hide confirmation overlay after deletion
    } catch (error) {
      console.error("Error deleting composition:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false); // Hide confirmation overlay
  };

  // Handle click outside to close options menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target)
      ) {
        setOptionsMenuVisible(false); // Close options menu when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThumbnailClick = (composition) => {
    setCurrentComposition(composition);
    setIsPlaying(true); // Start playing the video
  };

  // Handle click outside the player to close it
  useEffect(() => {
    const handleClickOutsidePlayer = (event) => {
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        setIsPlaying(false); // Close player when clicking outside
      }
    };

    if (isPlaying) {
      document.addEventListener("mousedown", handleClickOutsidePlayer);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePlayer);
    };
  }, [isPlaying]);

  return (
    <>
      <div className="flex flex-col relative items-center justify-start min-h-screen overflow-hidden bg-gradient-to-t from-blue-200 to-white">
        <Navbar
          profilePicture={"https://placehold.co/40x40"} // Default profile picture
          onProfilePictureClick={() => {}}
          onFileChange={() => {}}
          isMobileNavOpen={false}
          toggleMobileNav={() => {}}
        />

        <div className="space-y-4 w-full mt-24 overflow-y-auto px-4 lg:px-20">
          {compositions.length > 0 ? (
            <div className="flex flex-wrap -mx-4">
              {compositions.map((composition) => (
                <div
                  key={composition.id}
                  className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6"
                >
                  <div className="bg-white rounded-lg shadow-md cursor-pointer relative">
                    <img
                      src={API_URL + "/" + composition.thumbnail_path}
                      alt="Composition Thumbnail"
                      className="w-full h-48 object-cover"
                      onClick={() => handleThumbnailClick(composition)} // Play video on thumbnail click
                    />

                    <div className="p-4 relative">
                      <p className="text-[#8F8F99] text-[16px] font-500">
                        {composition.timestamp || "29th April, 2024"}
                        <i
                          className="fa-solid fa-ellipsis-vertical absolute right-5 text-black cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOptionsMenuToggle(composition);
                          }}
                        ></i>
                      </p>
                    </div>

                    {optionsMenuVisible && currentComposition === composition && (
                      <div
                        ref={optionsMenuRef} // Attach ref to the options menu
                        className="absolute top-56 right-7 bg-blue-900 hover:bg-red-600 text-white shadow-lg rounded-md p-2 h-10 z-10"
                      >
                        <button
                          onClick={handleDeleteComposition}
                          className="block w-full text-red-400 hover:text-white rounded px-2"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/create-video">
                <div className="fixed bottom-4 right-3 bg-black text-white rounded-full h-[40px] w-[40px] shadow-lg flex items-center justify-center">
                  <i className="fa-solid fa-video"></i>
                </div>
              </Link>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p>No Compositions available so far.</p>
            </div>
          )}
        </div>

        {/* ReactPlayer for playing the selected video */}
        {isPlaying && currentComposition && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-100">
            <div ref={playerRef} className="relative mt-11 h-[60%] w-[60%] bg-black">
              <ReactPlayer
                url={`${API}play_bg_video/${currentComposition.id}`}
                playing={isPlaying}
                controls
                width="100%"
                height="100%"
                onEnded={() => setIsPlaying(false)} // Stop playing when video ends
              />
            </div>
          </div>
        )}

        {/* Confirmation Overlay for Deletion */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete this video?</p>
              <div className="flex gap-x-5 mt-4">
                <button
                  className="w-20 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={confirmDelete}
                >
                  Yes
                </button>
                <button
                  className="w-20 px-4 py-2 bg-gray-300 text-black rounded"
                  onClick={cancelDelete}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Compositions;
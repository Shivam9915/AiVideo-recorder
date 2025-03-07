import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./partials/Navbar";
import { API, API_URL } from "../store.json";
import Footer from "./partials/Footer";
import ReactPlayer from 'react-player'; // Import ReactPlayer

const TrainedVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [popup, setPopup] = useState(false);
  const [videos, setVideos] = useState([]);
  const [needsTemplateSelection, setNeedsTemplateSelection] = useState(false);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [newFilename, setNewFilename] = useState("");
  const [loading, setLoading] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTemplate } = location.state || {};
  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/40x40"
  );
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const optionsMenuRef = useRef(null);
  const playerRef = useRef(null); // Ref for the video player
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${API_URL}/fetch_videos/${userId}`);
        setVideos(response.data.videos);
        const isError = response.data.videos.findIndex(
          (item) => item.error === 1
        );
        if (isError >= 0) {
          setOverlay(true);
          setCurrentVideo(response.data.videos[isError].filename);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target)
      ) {
        setOptionsMenuVisible(false);
      }
      // Close the video player if it's open
      if (popup && playerRef.current && !playerRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popup]);

  const handleGenerate = async () => {
    console.log(selectedTemplate, selectedVideo);
    const userId = localStorage.getItem("userId");
    if (!selectedTemplate || !selectedVideo) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/change_background`, {
        user_id: userId,
        template: selectedTemplate,
        video: selectedVideo,
      });

      if (response) {
        navigate("/compositions");
      }
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleVideoSelect = (video) => {
    if (selectedVideo === video) {
      setSelectedVideo(null);
      setPopup(false);
      setOptionsMenuVisible(false);
      setCurrentVideo(null);
      setNeedsTemplateSelection(false);
    } else {
      console.log(video);
      setSelectedVideo(video);
      setPopup(true);
      setOptionsMenuVisible(false);
      setCurrentVideo(video);
      setNeedsTemplateSelection(true);
    }
  };

  const handleOptionsMenuToggle = (filename) => {
    if (currentVideo === filename) {
      setOptionsMenuVisible(!optionsMenuVisible);
    } else {
      setCurrentVideo(filename);
      setOptionsMenuVisible(true);
    }
  };

  const handleDeleteVideo = () => {
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("filename", currentVideo);
    formData.append("user_id", userId);

    try {
      const response = await axios.post(`${API_URL}/delete_video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setVideos(videos.filter((video) => video.filename !== currentVideo));
      setOptionsMenuVisible(false);
      setCurrentVideo(null);
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setConfirmDeleteVisible(false);
    }
  };

  const handleEditFilename = async () => {
    const userId = localStorage.getItem("userId");
    console.log("new video"+newFilename);
    console.log("current"+currentVideo);
    
    if(!newFilename){
      setNewFilename(currentVideo)
    }
    // setOptionsMenuVisible(false);
    if (!newFilename || !currentVideo) return;

    try {
      const formData = new FormData();
      formData.append("filename", currentVideo);
      formData.append("new_filename", newFilename);
      formData.append("user_id", userId);
      console.log("come to call api");
      
      const response = await axios.post(`${API_URL}/rename_video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      

      setVideos(
        videos.map((video) =>
          video.filename === currentVideo
            ? { ...video, filename: newFilename }
            : video
        )
      );

      setOptionsMenuVisible(false);
      setCurrentVideo(null);
      setNewFilename("");
    } catch (error) {
      console.error("Error editing video filename:", error);
    }
  };

  const closeOverlay = () => {
    setOverlay(false);
    handleDeleteVideo();
  };

  const handleNavigateToMyVideos = async () => {
    const user_id = localStorage.getItem("userId");
    const formdata = new FormData();
    formdata.append('user_id', user_id);

    const response = await axios.post(`${API_URL}/videos`, formdata, {
      headers: {
        "Content-Type": "multipart/formdata"
      }
    });
    const data = response.data;
    console.log(data);
    const videos = response.data.videos;
    console.log(videos);
    if (data.success) {
      navigate('/videolist', { state: { videos } });
      console.log(response);
    }
  };

  const handleNavigateToTemplates = () => {
    navigate("/templates", { state: { selectedVideo } }); // Pass selectedVideo to Templates
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start min-h-screen overflow-x-hidden bg-gradient-to-t from-blue-200 to-white">
        <Navbar
          profilePicture={profilePicture}
          onProfilePictureClick={() => setFileInputVisible(true)}
          isMobileNavOpen={isMobileNavOpen}
          toggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        />

        <main className="p-4 w-full mt-20 max-w-4xl mx-auto">
          <h3 className="mb-5">Keep on refreshing......</h3>
          {videos.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 flex items-center justify-center">
              <p>No videos available so far.</p>
              <Link to="/Ai-Setup1">
                <div className="fixed bottom-4 right-12 bg-black text-white rounded-full h-[40px] w-[40px] shadow-lg flex items-center justify-center">
                  <i className="fa-solid fa-video"></i>
                </div>
              </Link>
            </div>
          ) : (
            videos.map((video, index) => {
              const isSelected = selectedVideo === video.id;
              const isOptionsVisible =
                currentVideo === video.filename && optionsMenuVisible;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedVideo(video.id)}
                  className={`bg-gradient-to-t ${
                    video.error ? "hidden" : ""
                  } from-blue-200 to-white shadow p-4 mb-4 flex items-center rounded relative ${
                    isSelected ? "border-4 border-blue-500" : ""
                  }`}
                >
                  <div className="relative">
                    {video.thumbnail_path ? (
                      <img
                        src={`${API}thumbnail/${video.id}`}
                        alt="Video Thumbnail"
                        className="rounded z-10 w-16 h-16 cursor-pointer"
                        onClick={() => handleVideoSelect(video.id)}
                      />
                    ) : (
                      <div className="bg-blue-200 flex justify-center items-center h-16 w-16 rounded">
                        <div className="loader animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow ml-6">
                    <p className="text-gray-500">
                      {video.created_at || "29th April, 2024"}
                    </p>
                    <h2 className="text-[20px] font-[600] text-[#4C4C50] flex items-center justify-between relative">
                      {video.filename.slice(0, -4)}{" "}
                      <i
                        className="fa-solid fa-ellipsis-vertical absolute right-2 text-black cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionsMenuToggle(video.filename);
                        }}
                      ></i>
                    </h2>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <i className="fas fa-check text-white"></i>
                    </div>
                  )}

                  {isOptionsVisible && (
                    <div
                      ref={optionsMenuRef}
                      className="absolute top-20 right-7 bg-zinc-100 shadow-lg pl-2 z-10 w-44"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateToTemplates();
                        }}
                        className="w-full h-7 pl-2 text-blue-400 hover:bg-blue-500 hover:text-white mt-1 flex items-center"
                      >
                        <i className="fas fa-th-large mr-2"></i>{" "}
                        Add background
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateToMyVideos();
                        }}
                        className="w-full h-7 text-blue-400 pl-2 hover:bg-blue-500 hover:text-white flex items-center"
                      >
                        <i className="fas fa-video mr-4"></i>{" "}
                        My Videos
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditFilename();
                        }}
                        className="w-full h-7 pl-2 text-blue-400 hover:bg-blue-500 hover:text-white flex items-center"
                      >
                        <i className="fas fa-edit mr-5"></i>{" "}
                        Rename
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVideo();
                        }}
                        className="w-full h-7 pl-2 text-red-500 hover:bg-red-400 hover:text-white flex items-center"
                      >
                        <i className="fas fa-trash mr-5"></i>{" "}
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {overlay && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Error</h2>
                <p>Sorry, can't generate video. Please try after sometime.</p>
                <div className="flex gap-x-5">
                  <button
                    className="w-20 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={closeOverlay}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {confirmDeleteVisible && (
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
                    onClick={() => setConfirmDeleteVisible(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedVideo && selectedTemplate && (
            <div className="fixed bottom-20 right-3 transition-opacity duration-300 ease-in-out">
              <button
                onClick={handleGenerate}
                className={`bg-black text-white font-[500] rounded-md px-7 py-3 shadow-lg hover:bg-gray-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
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
                    Generating ...
                  </span>
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          )}

          {newFilename && (
            <div className="fixed bottom-24 right-96 bg-zinc-400 shadow-lg rounded-md p-4 w-90">
              <input
                type="text"
                value={newFilename}
                onChange={(e) => setNewFilename(e.target.value)}
                className="border rounded-md p-2 w-full"
                placeholder="Enter new filename"
              />
              <button
                onClick={handleEditFilename}
                className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setNewFilename("");
                  setCurrentVideo(null);
                }}
                className="bg-gray-300 text-black rounded-md px-4 py-2 mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Render ReactPlayer */}
          {popup && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div ref={playerRef} className="relative w-[70%] h-[60%] max-w-3xl ml-7">
                <ReactPlayer
                  url={`${API}play_trained_video/${selectedVideo}`}
                  controls
                  width="100%"
                  height="100%"
                  className='object-cover'
                  playing
                  onEnded={() => setPopup(false)} // Deselect video when it ends
                />
              </div>
            </div>
          )}
        </main>
        <Link to="/Ai-Setup1">
          <div className="fixed bottom-4 right-12 bg-black text-white rounded-full h-[40px] w-[40px] shadow-lg flex items-center justify-center">
            <i className="fa-solid fa-video"></i>
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default TrainedVideos;
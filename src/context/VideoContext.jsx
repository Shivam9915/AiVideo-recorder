// VideoContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for the video
const VideoContext = createContext();

// Create a provider component
export const VideoProvider = ({ children }) => {
  const [recordedVideo, setRecordedVideo] = useState(null); // State to hold the recorded video

  return (
    <VideoContext.Provider value={{ recordedVideo, setRecordedVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

// Custom hook to use the VideoContext
export const useVideo = () => {
  return useContext(VideoContext);
};
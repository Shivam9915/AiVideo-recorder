import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API,API_URL } from "../store.json";
import axios from 'axios'
// import './VideoList.css'; // Import the CSS file for styling

const VideoList = () => {
  const location = useLocation();
  const { videos} = location.state || {}; // Access videos from location state
  console.log(videos)
const videos_id = videos.id
  console.log(videos_id)

  

  // Check if videos is defined and is an array
  if (!Array.isArray(videos) || videos.length === 0) {
    return <p className="no-videos">No videos available.</p>; // Display a message if no videos are found
  }

  return (
    <div className="video-list-container">
      <h2 className="video-list-title">User Videos</h2>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <video controls className="video-player">
              <source
                src={`${API}play_video/${video.id}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <h3 className="video-filename flex items-center justify-center mt-3">{video.filename.slice(0,-15)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import Navbar from '../partials/Navbar';
import Sidebar from './sidebar';
import { API_URL } from '../../store.json'; // Update with your actual path

const Favourites = () => { 
  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/40x40"
  ); // Default profile picture
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility
  const [videos, setVideos] = useState({}); // State to store the videos

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen); // Toggle mobile navbar visibility
  };

  const handleProfilePictureClick = () => {
    setFileInputVisible(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setFileInputVisible(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to fetch favourite videos
  const fetchFavouriteVideos = async () => {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    if (userId) {
      try {
        const response = await axios.get(`${API_URL}/user/videos/${userId}`);
        console.log(response.data);
        setVideos(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching favourite videos:', error);
      }
    } else {
      console.error('No user ID found in local storage');
    }
  };

  useEffect(() => {
    fetchFavouriteVideos(); // Fetch favourite videos when the component mounts
  }, []);

  console.log(videos)

  const backgroundChangesMetrics = [
    { title: "Total Background Changes", value: videos.total_background_changes || 0 },
    { title: "Monthly Background Changes", value: videos.monthly_background_changes || 0 },
    { title: "Quarterly Background Changes", value: videos.quarterly_background_changes || 0 },
    { title: "Yearly Background Changes", value: videos.yearly_background_changes || 0 },
  ];

  const videoMetrics = [
    { title: "Total Videos", value: videos.total_videos || 0 },
    { title: "Monthly Videos", value: videos.monthly_videos || 0 },
    { title: "Quarterly Videos", value: videos.quarterly_videos || 0 },
    { title: "Yearly Videos", value: videos.yearly_videos || 0 },
  ];

  return (
    <div className="h-screen bg-gray-100">
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="flex flex-col lg:flex-row h-full items-start bg-gradient-to-t from-blue-300 to-white">
        <Sidebar isOpen={isMobileNavOpen} toggle={toggleMobileNav} />
        <div className="flex-1 p-6 items-start">
          <h1 className="text-2xl font-bold mb-5 mt-14">My Videos:</h1>
          
          <div className="flex flex-wrap gap-6">
            {/* Background changes metrics */}
            {backgroundChangesMetrics.map((metric, index) => (
              <div
                key={index}
                className={`p-4 w-64 h-32 rounded shadow transition-transform duration-300 ease-in-out ${
                  index === 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white hover:bg-gray-100'
                } hover:shadow-lg transform hover:scale-105 flex-1`}
              >
                <h2 className="text-lg font-semibold">{metric.title}</h2>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            {/* Video metrics */}
            {videoMetrics.map((metric, index) => (
              <div
                key={index}
                className={`p-4 w-64 h-32 rounded shadow transition-transform duration-300 ease-in-out ${
                  index === 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white hover:bg-gray-100'
                } hover:shadow-lg transform hover:scale-105 flex-1`}
              >
                <h2 className="text-lg font-semibold">{metric.title}</h2>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;

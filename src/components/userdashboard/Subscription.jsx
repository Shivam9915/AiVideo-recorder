// src/Subscription.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Navbar from '../partials/Navbar';
import Sidebar from './sidebar';
import { API_URL } from '../../store.json';

const Subscription = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://placehold.co/40x40"
  ); // Default profile picture
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const [subscriptionData, setSubscriptionData] = useState({
    renewal: null,
    subscription_end_date: null,
    subscription_plan: null,
    subscription_price: null,
    subscription_status: "No Plan",
    user_details: null
  });

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

  // Function to fetch subscription data
  const fetchSubscriptionData = async () => {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    const plan = "A"; // Define the plan
    const duration = 3;
    const price = "500";

    try {
      const response = await axios.get(`${API_URL}/user/subscription/${userId}`, {
        user_id: userId,
        plan_name: plan,
        duration,
        price
      });
      console.log(response.data);
      const data = response.data;

      setSubscriptionData({
        renewal: data.end_date,
        subscription_end_date: data.subscription_end_date,
        subscription_plan: data.subscription_plan,
        subscription_price: data.subscription_price,
        subscription_status: data.subscription_status
        , // You can adjust this based on actual data
        user_details: data.user_id
      }); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  useEffect(() => {
    // Close the sidebar when clicking outside
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(event.target)) {
        setIsMobileNavOpen(false);
      }
    };

    if (isMobileNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileNavOpen]);

  return (
    <div className="mx-auto h-screen">
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />

      <div className="flex flex-col lg:flex-row h-screen items-start bg-gradient-to-t from-blue-300 to-white">
        <Sidebar isOpen={isMobileNavOpen} toggle={toggleMobileNav} />

        <div className={`flex-1 p-6 items-start transition-all duration-300 ${isMobileNavOpen ? 'ml-0' : 'lg:ml-10'}`}>
          <h1 className="text-2xl font-bold mb-5 mt-14">My Subscription</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full">
            <h2 className="text-xl font-bold">Subscription Status</h2>
            <p className="mt-2 text-gray-600">Status: <span className="font-semibold">{subscriptionData.subscription_status}</span></p>
            <p className="mt-2 text-gray-600">Plan: <span className="font-semibold">{subscriptionData.subscription_plan || "N/A"}</span></p>
            <p className="mt-2 text-gray-600">Price: <span className="font-semibold">{subscriptionData.subscription_price || "N/A"}</span></p>
            <p className="mt-2 text-gray-600">End Date: <span className="font-semibold">{subscriptionData.subscription_end_date || "N/A"}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

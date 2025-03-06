import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../partials/Navbar';
import Sidebar from './sidebar';
import Footer from '../partials/Footer';

const UserDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("https://placehold.co/40x40"); // Default profile picture
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

  return (
    <>
      <Navbar
        profilePicture={profilePicture}
        onProfilePictureClick={handleProfilePictureClick}
        onFileChange={handleFileChange}
        isMobileNavOpen={isMobileNavOpen}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="container mx-auto flex flex-col lg:flex-row mt-10 lg:mt-[7%] h-full lg:h-screen">
        <Sidebar isOpen={isMobileNavOpen} toggle={toggleMobileNav} />
        <main className="w-full lg:w-3/4 bg-white shadow-md p-6 lg:ml-6">
          <h1 className="text-2xl font-bold mb-6">Account Information</h1>
          <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Account Details</h2>
              <NavLink to="/edit-account-details" className="text-orange-500">
                Edit
              </NavLink>
            </div>
            <div className="space-y-2">
              <div>
                <span className="block text-gray-600">First Name</span>
                <span className="block text-gray-800">Mohit</span>
              </div>
              <div>
                <span className="block text-gray-600">Last Name</span>
                <span className="block text-gray-800">Jaiswal</span>
              </div>
              <div>
                <span className="block text-gray-600">Phone</span>
                <span className="block text-gray-800">+15645645646</span>
              </div>
              <div>
                <span className="block text-gray-600">Email</span>
                <span className="block text-gray-800">jaiswalmohit217@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Details</h2>
              <NavLink to="/edit-user-details" className="text-orange-500">
                Edit
              </NavLink>
            </div>
            <div className="space-y-2">
              <div>
                <span className="block text-gray-600">Date of Birth</span>
                <span className="block text-gray-800">01/01/1990</span>
              </div>
              <div>
                <span className="block text-gray-600">Gender</span>
                <span className="block text-gray-800">Male</span>
              </div>
              <div>
                <span className="block text-gray-600">Address</span>
                <span className="block text-gray-800">123 Street, City, Country</span>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;

import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import { API, API_URL } from "../../store.json";
import userpanel from "../../assets/userpanel.jpg";
import adminpanel from "../../assets/admin-panel.png";

const Navbar = ({ profilePicture, isMobileNavOpen, toggleMobileNav }) => {
  const navigate = useNavigate();
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const logoutMenuRef = useRef(null);
  const [dp, setDp] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [isProfileEnlarged, setIsProfileEnlarged] = useState(false); // New state for enlarged profile picture
  const [showChangeOption, setShowChangeOption] = useState(false); // New state for showing change option
  const fileInputRef = useRef(null); // Reference for the file input
  const userId = localStorage.getItem("userId");
  const id = localStorage.getItem("id");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);
      formData.append("user_id", userId); // Add any other necessary data to formData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      try {
        const response = await axios.post(
          `${API_URL}/update_profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        localStorage.setItem("id", response.data.id);
        console.log(localStorage.getItem("id"));
        // Update the profile picture state with the new URL
        // setDp(response.data.profile_pictire_path
        // );
        // Adjust based on your API response
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const handleProfilePictureClick = () => {
    setIsProfileEnlarged(true);
    setShowChangeOption(false); // Hide the change option when first enlarged
  };

  const handleProfileEnlargedClick = () => {
    setShowChangeOption(true); // Show the change option when the enlarged image is clicked
  };

  const handleChangePictureClick = () => {
    fileInputRef.current.click(); // Trigger the file input
    setIsProfileEnlarged(false); // Close the enlarged view
    setShowChangeOption(false); // Hide the change option
  };

  console.log(dp);

  useEffect(() => {
    const initial = localStorage.getItem("userInitial");
    if (initial) {
      setUserInitial(initial);
    }
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
        setIsProfileEnlarged(false); // Close the enlarged view
        setShowChangeOption(false);
      }
      if (
        logoutMenuRef.current &&
        !logoutMenuRef.current.contains(event.target)
      ) {
        setIsLogoutMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleLogoutMenu = () => {
    setIsLogoutMenuOpen(!isLogoutMenuOpen);
  };

  // const handleFileInputClick = () => {
  //   fileInputRef.current.click(); // Trigger the file input
  // };

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 fixed top-0 left-0 w-full z-20 bg-[#E6F2F2] h-20`}
      >
        <div className="flex items-center justify-center">
          <button onClick={toggleMobileNav} className="md:hidden mr-8">
            <i className="fas fa-bars text-2xl"></i>
          </button>
          <Link to="/">
            <h1 className="font-[600] text-[26px] text-blue-500">
              {" "}
              AiVideo Recorder{" "}
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden md:flex items-center">
            {/* Navigation Links */}
            <NavLink
              to="/trainedvideos"
              className={({ isActive }) =>
                `mx-4 text-md font-semibold ${
                  isActive ? "bg-[#48A6A7] px-2 py-1 rounded" : "text-gray-700"
                } hover:text-blue-900`
              }
            >
              <i className="fas fa-video inline mr-1"></i> Trained Videos
            </NavLink>
            <NavLink
              to="/templates"
              className={({ isActive }) =>
                `mx-4 text-md font-semibold ${
                  isActive ? "bg-[#48A6A7] px-2 py-1 rounded" : "text-gray-700"
                } hover:text-blue-900`
              }
            >
              <i className="fas fa-file-alt inline mr-1"></i> Templates
            </NavLink>
            <NavLink
              to="/compositions"
              className={({ isActive }) =>
                `mx-4 text-md font-semibold ${
                  isActive ? "bg-[#48A6A7] px-2 py-1 rounded" : "text-gray-700"
                } hover:text-blue-900`
              }
            >
              <i className="fas fa-clipboard-list inline mr-1"></i> Compositions
            </NavLink>
            {/* Profile and Logout Menu */}
            <div className="flex items-start justify-between border border-gray-500 rounded-t-3xl rounded-bl-3xl">
              <div className="relative flex items-start">
                {!profilepic ? (
                  <img
                    src={`${API_URL}/get_profile_picture/${id}`}
                    alt="User Profile"
                    className="rounded-full object-cover w-10 h-10 cursor-pointer"
                    onClick={handleProfilePictureClick}
                  />
                ) : userInitial && !profilepic ? (
                  <div
                    className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer bg-blue-500 text-white font-bold text-xl"
                    onClick={handleProfilePictureClick}
                  >
                    {userInitial}
                  </div>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {isProfileEnlarged && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30"
                    onClick={handleProfileEnlargedClick}
                  >
                    <div className="relative">
                      <img
                        src={`${API_URL}/get_profile_picture/${id}`}
                        alt="Enlarged Profile"
                        className="rounded-full w-32 h-32 object-cover cursor-pointer"
                      />
                      {showChangeOption && (
                        <div
                          ref={profileMenuRef}
                          className="absolute right-[-5px] mt-3 top-[100%] w-36 bg-white text-[#4C4C4C] border-gray-300 border hover:bg-gray-300 hover:text-black shadow-lg rounded-md z-20"
                        >
                          <button
                            onClick={handleChangePictureClick}
                            className="px-2 py-2 text-md w-full text-left rounded-md"
                          >
                            Edit Profile pic 
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
              <button onClick={toggleLogoutMenu}>
                <i
                  className={`fas fa-chevron-${
                    isLogoutMenuOpen ? "up" : "down"
                  } text-gray-700 ml-3 mr-2 mt-3`}
                ></i>
              </button>
            </div>
          </div>
          {isLogoutMenuOpen && (
            <div
              ref={logoutMenuRef}
              className="absolute right-9 mt-[210px] w-56 bg-white border border-gray-200 rounded-md shadow-lg py-4"
            >
              <ul>
                <li>
                  <Link
                    to="/admin-panel"
                    className="px-4 py-2 text-blue-900 hover:bg-gray-100 flex gap-x-3"
                  >
                    <img
                      className="h-5 w-5"
                      src={adminpanel}
                      alt="Admin Panel"
                    />{" "}
                    Admin Panel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/userpanel"
                    className="flex items-center gap-x-3 px-4 py-2 text-blue-600 hover:bg-gray-100"
                  >
                    <img
                      className="h-5 w-5 rounded-full"
                      src={userpanel}
                      alt
                    ></img>
                    User Panel
                  </Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2 hover:text-red-500"></i>{" "}
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isMobileNavOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleMobileNav}
          ></div>
          <div
            className={`fixed top-0 left-0 h-full bg-slate-100 z-20 transition-transform transform ${
              isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
            } w-4/6`}
          >
            <div className="h-[20%] bg-[#3674B5] pt-6 pl-2">
            <div className="relative flex items-start">
                {!profilepic && !userInitial ? (
                  <img
                    src={`${API_URL}/get_profile_picture/${id}`}
                    alt="User Profile"
                    className="rounded-full object-cover w-10 h-10 cursor-pointer"
                    onClick={handleProfilePictureClick}
                  />
                ) : userInitial && !profilepic ? (
                  <div
                    className="flex items-center justify-center rounded-full w-10 h-10 cursor-pointer bg-blue-500 text-white font-bold text-xl"
                    onClick={handleProfilePictureClick}
                  >
                    {userInitial}
                  </div>
                ) : null}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {isProfileEnlarged && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-30"
                    onClick={handleProfileEnlargedClick}
                  >
                    <div className="relative">
                      <img
                        src={`${API_URL}/get_profile_picture/${id}`}
                        alt="Enlarged Profile"
                        className="rounded-full w-32 h-32 object-cover cursor-pointer"
                      />
                      {profilepic && showChangeOption && (
                        <div
                          ref={profileMenuRef}
                          className="absolute right-[-5px] mt-3 top-[100%] w-36 bg-white text-[#4C4C4C] border-gray-300 border hover:bg-gray-300 hover:text-black shadow-lg rounded-md z-20"
                        >
                          <button
                            onClick={handleChangePictureClick}
                            className="px-2 py-2 text-md w-full text-left rounded-md"
                          >
                            Edit Profile pic 
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
            <div className="p-4 bg-white">
              <NavLink
                to="/trainedvideos"
                className={({ isActive }) =>
                  `block px-4 py-2 text-md font-semibold ${
                    isActive
                      ? "bg-[#48A6A7] px-2 py-1 rounded"
                      : "text-gray-700"
                  } hover:text-blue-900`
                }
              >
                <i className="fas fa-video inline mr-1"></i> Trained Videos
              </NavLink>
              <NavLink
                to="/templates"
                className={({ isActive }) =>
                  `block px-4 py-2 text-md font-semibold ${
                    isActive
                      ? "bg-[#48A6A7] px-2 py-1 rounded"
                      : "text-gray-700"
                  } hover:text-blue-900`
                }
              >
                <i className="fas fa-file-alt inline mr-1"></i> Templates
              </NavLink>
              <NavLink
                to="/compositions"
                className={({ isActive }) =>
                  `block px-4 py-2 text-md font-semibold ${
                    isActive
                      ? "bg-[#48A6A7] px-2 py-1 rounded"
                      : "text-gray-700"
                  } hover:text-blue-900`
                }
              >
                <i className="fas fa-clipboard-list inline mr-1"></i>{" "}
                Compositions
              </NavLink>
              <NavLink
                to="/admin-panel"
                className={({ isActive }) =>
                  `flex gap-x-2 px-2 py-2 text-md font-semibold ${
                    isActive
                      ? "bg-[#48A6A7] px-2 py-1 rounded"
                      : "text-gray-700"
                  } hover:text-blue-900`
                }
              >
                <img
                  className="h-5 w-5"
                  src="src/assets/admin-panel.png"
                  alt="Admin Panel"
                />{" "}
                Admin Panel
              </NavLink>
              <NavLink
                to="/userpanel"
                className={({ isActive }) =>
                  `flex gap-x-2 px-2 py-2 text-md font-semibold ${
                    isActive
                      ? "bg-[#48A6A7] px-2 py-1 rounded"
                      : "text-gray-700"
                  } hover:text-blue-900`
                }
              >
                <img
                  className="h-5 w-5 rounded-full"
                  src="src/assets/userpanel.jpg"
                  alt="User  Panel"
                />{" "}
                Userpanel
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-3 flex pl-2 py-2 mb-2 mt-4 text-md w-36 bg-[#EFF1F1] text-[#4C4C4C] border hover:bg-gray-300 hover:text-black"
              >
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

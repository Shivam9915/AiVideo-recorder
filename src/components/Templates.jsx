import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./partials/Navbar";
import axios from "axios";
import { TEMPLATE_URL, API_URL } from "../store.json";
import Footer from "./partials/Footer";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [uploadingTemplate, setUploadingTemplate] = useState(false); // New state for template upload loading
  const location = useLocation();
  const { selectedVideo } = location.state || {}; 
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("https://placehold.co/40x40");
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [uploadedTemplate, setUploadedTemplate] = useState(null); 

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${API_URL}/templates`);
        setTemplates(response.data.templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template === selectedTemplate ? null : template);
  };

  const handleGenerate = async () => {
    if (!selectedTemplate || !selectedVideo) return;
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/change_background`, {
        user_id: userId,
        template: selectedTemplate,
        video: selectedVideo,
      });
      if (response) {
        const videoid = response.data.video_id;
        localStorage.setItem("videoid", videoid);
        navigate("/compositions");
      }
    } catch (error) {
      console.error("Error generating video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToVideos = () => {
    navigate('/trainedvideos', { state: { selectedTemplate } });
  };

  // Updated function to handle template upload
  const handleTemplateUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('template', file);
      formData.append('user_id', userId);
      formData.append("video", selectedVideo);

      setUploadingTemplate(true); // Set uploading state to true

      try {
        const response = await axios.post(`${API_URL}/change_background1`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        if (response.data) {
          navigate('/compositions');
          // setUploadedTemplate(response.data.template);
          // setTemplates([...templates, response.data.template]);
        }
      } catch (error) {
        console.error("Error uploading template:", error);
      } finally {
        setUploadingTemplate(false); // Reset uploading state
      }
    }
  };

  return (
    <>
      <div className="flex flex-col relative items-center justify-start min-h-screen overflow-x-hidden bg-gradient-to-t from-blue-200 to-white">
        <Navbar
          profilePicture={profilePicture}
          onProfilePictureClick={handleProfilePictureClick}
          onFileChange={handleFileChange}
          isMobileNavOpen={isMobileNavOpen}
          toggleMobileNav={toggleMobileNav}
        />

        <div className="space-y-4 space-x-5 w-full mt-20 overflow-y-auto max-w-6xl mx-auto p-4 flex flex-wrap justify-center bg-gradient-to-t from-blue-200 to-white">
          {templates.length > 0 ? (
            templates.map((template) => (
              <div
                key={template.id}
                className={`bg-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 m-2 w-[95%] sm:w-1/2 lg:w-1/3 ${
                  selectedTemplate === template
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <img
                  src={TEMPLATE_URL + template}
                  alt="Template"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <p className="text-[#8F8F99] text-[16px] font-500">
                    29th April, 2024
                  </p>
                  <h2 className="text-[20px] font-[600] text-[#4C4C50] flex items-center justify-between">
                    {template.title}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10 w-full">
              <p>No templates available so far.</p>
            </div>
          )}
          <Link to="/create-video">
            <div className="fixed bottom-4 right-12 bg-black text-white rounded-full h-[40px] w-[40px] shadow-lg flex items-center justify-center">
              <i className="fa-solid fa-video"></i>
            </div>
          </Link>
        </div>

        {selectedVideo && (
          <div className="fixed bottom-40 right-6 flex flex-col items-end space-y-4">
            <input
              type="file"
              id="templateUpload"
              className="hidden"
              onChange={handleTemplateUpload}
            />
            <label
              htmlFor="templateUpload"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 transition duration-300 flex items-center space-x-2"
            >
              {uploadingTemplate ? ( // Conditional rendering for loading state
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
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
                  Creating...
                </span>
              ) : (
                <>
                  <i className="fa-solid fa-upload"></i>
                  <span>Add Template</span>
                </>
              )}
            </label>
          </div>
        )}

        {selectedTemplate && selectedVideo ? (
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
                <>
                  <i className="fa-solid fa-cogs mr-2"></i>
                  Generate
                </>
              )}
            </button>
          </div>
        ) : selectedTemplate && (
          <div className="fixed bottom-24 right-7">
            <button onClick={handleNavigateToVideos} className="bg-red-600 px-5 py-2 w-40 rounded-sm z-99 flex items-center justify-center space-x-2">
              <i className="fa-solid fa-video-camera"></i>
              <span>Select video</span>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Templates;
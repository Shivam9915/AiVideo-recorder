import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../store.json";
import Navbar from "./partials/Navbar";
import { useVideo } from "../context/VideoContext";
import {BASE_URL} from "../store.json";

const WriteText = () => {
    const [textInput, setTextInput] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { recordedVideo } = useVideo();
    const userId = localStorage.getItem("userId");
    const [profilePicture, setProfilePicture] = useState("https://placehold.co/40x40");
    const [fileInputVisible, setFileInputVisible] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const videourl = localStorage.getItem("videourl")
    const gender = localStorage.getItem("gender")

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

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const handleTextChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleGenerateVideo = async () => {
        if (!textInput.trim()) {
            alert("Text input cannot be empty.");
            return;
        }

        // Redirect to trained videos page with loading state
        navigate(BASE_URL+"/trainedvideos", { state: { isGenerating: true, textInput, videourl, userId } });
        const formData = new FormData();
        formData.append("text", textInput);
        formData.append("video", videourl);
        formData.append("user_id", userId);
        formData.append("gender", gender);

        
        // Log the contents of the FormData object
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post(
                `${baseUrl.API_URL}/generate_video`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            localStorage.removeItem("videourl");
            localStorage.removeItem("gender");

            // Handle successful response here
            console.log(response)
        } catch (error) {
            console.error("Error generating video:", error);
        }
    };


    return (
        <div className="relative">
            <Navbar
                profilePicture={profilePicture}
                onProfilePictureClick={handleProfilePictureClick}
                onFileChange={handleFileChange}
                isMobileNavOpen={isMobileNavOpen}
                toggleMobileNav={toggleMobileNav}
            />
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                <div className="absolute top-16 w-full p-4">
                    <Link to={BASE_URL+"/create-video"} className="mr-4">
                        <i className="fas fa-arrow-left text-2xl text-black hover:text-blue-900"></i>
                    </Link>
                </div>
                <div className="w-full max-w-md p-4">
                    <label className="block mb-2 text-lg font-medium">Write Text</label>
                    <textarea
                        className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        placeholder="Write Your Text Here"
                        value={textInput}
                        onChange={handleTextChange}
                    ></textarea>
                    <button
                        onClick={handleGenerateVideo}
                        type="submit"
                        className="w-full p-2 text-white bg-blue-500 rounded mt-1 mb-2"
                    >
                        Generate video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteText;
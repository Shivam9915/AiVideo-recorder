// SetupAi2.js
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import { useVideo } from "../context/VideoContext";
import { API_URL, BASE_URL } from "../store.json";
import axios from "axios";
import ConsentDialog from "./partials/ConsentDialogbox"; // Import the ConsentDialog

const SetupAi2 = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConsentDialog, setShowConsentDialog] = useState(false); // State for consent dialog
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const videoRef = useRef(null);
  const { recordedVideo, setRecordedVideo } = useVideo();
  const userId = localStorage.getItem("userId");

  const handleUploadAudio = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      setShowConsentDialog(true); // Show consent dialog
    }
  };

  const handleConsentConfirm = async () => {
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("video", selectedFile);
      formdata.append("user_id", userId);
      formdata.append("consent", "yes"); // Indicate consent
      try {
        const response = await axios.post(`${API_URL}/upload_video`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        const videourl = response.data.video_url;
        const gender = response.data.gender;

        localStorage.setItem("videourl", videourl);
        localStorage.setItem("gender", gender);

        if (response.data.success) {
          navigate(BASE_URL+"/create-video");
        }

        setShowConsentDialog(false);
      } catch (error) {
        console.log(error);
        setShowConsentDialog(false); // Close the dialog after handling consent
      }
    } else {
      setShowConsentDialog(false);
    }
  };

  const handleConsentCancel = () => {
    setShowConsentDialog(false); // Close the dialog without uploading
  };

  const handleRecordClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "video/webm" });
          setRecordedVideo(blob); // Save the recorded video to context
          recordedChunks.current = []; // Clear the chunks
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }
  };

  const handleContinueClick = () => {
    // Navigate to Ai-Setup3 when the continue button is clicked
    navigate(BASE_URL+"/Ai-Setup3");
  };

  const handleClose = () => {
    navigate(BASE_URL+"/Ai-Setup1");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
        <Navbar />
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2 mx-auto md:mx-4 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Say...</h2>
              <button onClick={handleClose} className="text-red-500 text-2xl">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg mb-4 mt-5">
              <p className="text-center text-white font-bold text-sm">
                “The quick brown fox jumps over the lazy dog, swiftly zigzagging
                through forests, valleys, and cliffs, quenching its thirst by
                crystal-clear streams, while gracefully dancing under moonlit
                skies.”
              </p>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={isRecording ? handleRecordClick : handleContinueClick}
                className={`w-1/2 ${
                  isRecording ? "bg-red-500" : "bg-green-500"
                } text-white rounded-lg py-2 font-bold`}
                disabled={!isRecording && !recordedVideo}
              >
                {isRecording ? "Stop Recording" : "Continue"}
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center w-full md:w-1/2 mx-auto md:mx-4 p-2">
            <div className="bg-black rounded-lg overflow-hidden w-full mb-2">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-64 md:h-72 md:w-full object-cover"
              ></video>
            </div>
            <div className="flex justify-center items-center space-x-10 bg-gray-800 py-4 w-full px-5 md:space-x-10">
              <div>
                <label className="w-12 h-12 border border-white rounded-full flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleUploadAudio}
                  />
                  <i class="fa-solid fa-images"></i>{" "}
                </label>
                <h6 className=" mt-1">Gallary</h6>
              </div>
              <div>
                <button
                  className="w-12 h-12 border-2 border-white bg-red-500 rounded-full"
                  onClick={handleRecordClick}
                ></button>
                <h6 className="mt-1">Record</h6>
              </div>
              {/* <button className="w-12 h-12 border border-white rounded-full">
                <i className="fas fa-camera-rotate text-white"></i>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {showConsentDialog && (
        <ConsentDialog
          onConfirm={handleConsentConfirm}
          onCancel={handleConsentCancel}
        />
      )}
      <Footer />
    </>
  );
};

export default SetupAi2;

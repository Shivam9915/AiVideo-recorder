import React from "react";
import HorizontalNav from "./partials/HorizontalNav";
import Footer from "./partials/Footer";
import { Link } from "react-router-dom";
import camera from "../assets/cameraReady.png";
import laptop from "../assets/laptop.png";
import text from "../assets/teext.png";
import shubhamsir from "../assets/shubhamsir.mp4";
import background from "../assets/background.png";




const Home = () => {
  return (
    
    <div className="h-auto w-full bg-[#ECEEEE] p-2 overflow-hidden">
      <HorizontalNav />
      {/* first page */}
      <div className="bg-gradient-to-b from-blue-200 to-white flex items-center justify-center mt-10 min-h-[60vh] max-w-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-black mb-4">AI Video Recorder</h1>
          <p className="text-lg text-gray-700 mb-6">
            Realistic compositions, natural text-to-speech, and powerful AI
            video lipsyncing all in one platform.
          </p>
          <Link to='/register' className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            <i className="fas fa-magic mr-2"></i> Create a Free Video
          </Link>
          {/* <p className="text-sm text-gray-500 mt-2">
            Unlimited Video | No credit card required
          </p> */}
        </div>
      </div>

      {/* second page */}
      <div className="bg-gradient-to-t from-blue-200 to-white flex flex-col md:flex-row items-center justify-between p-8 max-width-full">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create New Video
          </h1>
          <p className="text-lg mb-6">
            Supercharge your news production by creating breaking
            news videos, news segments, & more in minutes.
          </p>
          <Link to='/register' className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold">
            Get started — it's free
          </Link>
        </div>
        <div className="md:w-[100%] mt-8 md:mt-0">
          <img
            alt="Laptop showing news video creation interface"
            className="w-full h-auto object-fit"
            src={laptop}
          />
        </div>
      </div>

      {/* third page */}
      <div className="container mx-auto py-12 max-w-">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Camera-Ready 24/7 */}
          <div className="text-center flex flex-col items-center justify-center">
            <img
              alt="Three avatars ready to create videos"
              className="mx-auto mb-4 h-[40vh] object-fit"
              src={camera}
            />
            <h2 className="text-xl font-semibold mb-2">Camera-Ready 24/7</h2>
            <p className="text-gray-600">
              Our application is ready to create videos anytime, from anywhere,
              eliminating the need for makeup, scheduling, or other
              preparations.
            </p>
          </div>
          {/* Lifelike Text-to-Speech */}
          <div className="text-center flex flex-col items-center justify-center">
            <img
              alt="Avatar demonstrating lifelike text-to-speech"
              className="mx-auto mb-4 h-[40vh] object-cover"
              src={text}
            />
            <h2 className="text-xl font-semibold mb-2">Lifelike Text-to-Speech</h2>
            <p className="text-gray-600">
              Trained videos say the script perfectly each time in over 2
              languages, making reshoots, dubbing, or translations unnecessary.
            </p>
          </div>
          {/* AI Video Editing Tools */}
          <div className="text-center flex flex-col items-center justify-center">
            <img
              alt="AI video editing tools interface"
              className="mx-auto mb-4 h-[40vh] object-cover"
              src={background}
            />
            <h2 className="text-xl font-semibold mb-2">Background Change</h2>
            <p className="text-gray-600">
              All the best of AI for content creation at your fingertips.
              Instantly convert URLs, text files, prompts, and news articles
              into videos.
            </p>
          </div>
        </div>
      </div>
      {/* fourth page */}

      <div className="flex flex-col items-center py-10 md:px-20 bg-black text-[#F7F7F7] max-w-full">
  <h1 className="text-lg md:text-4xl font-bold text-center mb-4 w-[80%]">
    How to Use Free AiVideo Recorder to record in{" "}
    <span className="text-purple-500">4 Steps</span>
  </h1>
  <p className="text-center text-lg md:text-xl mb-10">
    Follow these 4 simple steps to make numerous professional news videos.
  </p>
  <div className="flex flex-col md:flex-row items-center md:items-start">
    <div className="flex flex-col items-center md:items-start space-y-8 md:mr-10">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-500 p-4 rounded-full">
          <i className="fas fa-check text-white text-2xl"></i>
        </div>
        <p className="text-lg md:text-xl">Open AiVideo Recorder.</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-gray-700 p-4 rounded-full">
          <i className="fas fa-video text-white text-2xl"></i>
        </div>
        <p className="text-lg md:text-xl">
          Record a sample video for 30 seconds to 1 minute.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-gray-700 p-4 rounded-full">
          <i className="fas fa-edit text-white text-2xl"></i>
        </div>
        <p className="text-lg md:text-xl">
          Give texts (using write text, file upload, record audio, AI-generate).
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-gray-700 p-4 rounded-full">
          <i className="fas fa-edit text-white text-2xl"></i>
        </div>
        <p className="text-lg md:text-xl">
          Generate lipsynced video with background templates.
        </p>
      </div>
    </div>
    <div className="md:w-[100%] mt-8 md:mt-0 flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        alt="Laptop showing news video creation interface"
        className="w-full max-w-[70%] h-auto object-cover rounded-3xl border" // Updated styles for responsiveness
        src={shubhamsir}
      />
    </div>
  </div>
  {/* <Link to='/register' className="mt-10 mb-[5%] bg-purple-500 text-white text-lg md:text-xl py-3 px-6 rounded-full hover:bg-purple-600">
    Create Free News Video Now
  </Link> */}
</div>
      <Footer/>
    </div>
  );
};

export default Home;
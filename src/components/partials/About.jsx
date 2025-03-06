import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import HorizontalNav from './HorizontalNav';
import Footer from './Footer';

const About = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const sections = [
    {
      title: "Features",
      content: (
        <ul className="list-disc ml-6">
          <li>Record Video: Start by recording your video effortlessly within our application.</li>
          <li>Generate Options:
            <ul className="list-disc ml-6">
              <li>Write to Text: Type your script directly and let our AI convert it to audio.</li>
              <li>Upload Text File: Upload any text file, and we'll handle the rest.</li>
              <li>Use Audio: Record or upload an audio file, and our app will transcribe and sync it.</li>
              <li>AI Generate: Use our AI to create scripts from prompts.</li>
            </ul>
          </li>
          <li>Preview & Edit: Get a preview of your video and make real-time edits to the script or audio before finalizing.</li>
          <li>Seamless Integration: Our backend seamlessly converts text to speech, ensuring perfect lip-sync with your video.</li>
          <li>AI-Powered Lipsync: Experience state-of-the-art AI technology that lip-syncs your audio with the recorded video flawlessly.</li>
        </ul>
      )
    },
    {
      title: "How It Works",
      content: (
        <ol className="list-decimal ml-6">
          <li>Record your video: Start with a simple video recording in our app.</li>
          <li>Choose your audio method:
            <ul className="list-disc ml-6">
              <li>Prompt: Write and send text to be converted to audio.</li>
              <li>Upload: Add a text file for conversion.</li>
              <li>Audio: Upload or record an audio file, which we’ll transcribe and sync.</li>
              <li>AI Generate: Use our AI to create a unique script.</li>
            </ul>
          </li>
          <li>Text to Speech: If using text, our backend converts it to audio, syncing it with your video.</li>
          <li>Preview & Edit: Get a preview and make any necessary changes.</li>
          <li>Final Generate: Hit the generate button for a perfectly lip-synced video.</li>
        </ol>
      )
    },
    {
      title: "Why Choose Us?",
      content: (
        <ul className="list-disc ml-6">
          <li>User-Friendly: Intuitive design for hassle-free video creation.</li>
          <li>Advanced AI: Cutting-edge AI ensures accuracy and efficiency.</li>
          <li>Versatile: Multiple options for inputting and synchronizing audio.</li>
          <li>Real-Time Edits: Make instant changes for perfect results.</li>
          <li>Reliable: Our robust backend ensures consistent performance.</li>
          <li>Customizable: Tailor your videos to fit your unique needs.</li>
        </ul>
      )
    },
  ];

  return (
<>
<HorizontalNav/>
<div className=" mx-auto p-16 bg-gradient-to-b from-blue-200 to-whiteshadow-lg rounded-lg h-screen mt-7">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">AiVideo Recorder App</h1>
      <p className="text-gray-700 mb-10 text-center w-[70%] mx-auto">Welcome to the future of video synchronization! Our AI-powered application revolutionizes the way you create and sync videos with audio. Here’s what makes us special:</p>
      {sections.map((section, index) => (
        <div key={index} className="mb-9 pl-28">
          <h2
            className="text-2xl font-semibold cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => toggleExpand(index)}
          >
            {section.title}
          </h2>
          {expanded === index && (
            <div className="bg-gray-50 p-4 border-l-4 border-blue-500 rounded-lg transition-all duration-300 ease-in-out">
              {section.content}
            </div>
          )}
        </div>
      ))}
      {/* <div className="mt-6 pl-28">
        <p className="font-bold text-lg">Add interactive UI elements here, such as:</p>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Tabs or Accordion Panels</li>
          <li>Preview Windows</li>
          <li>Progress Bars</li>
          <li>Tooltips</li>
          <li>Drag-and-Drop functionality</li>
        </ul>
      </div> */}
    </div>
    <Footer/>
</>
  );
};

export default About;
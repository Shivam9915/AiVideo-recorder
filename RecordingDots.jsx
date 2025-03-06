import React, { useState, useEffect } from 'react';
import './src/components/RecordingDots.css'; // Import your CSS file for styling

const RecordingDots = ({ isRecording }) => {
    const [dotCount, setDotCount] = useState(0);
    const maxDots = 5; // Maximum number of dots to display

    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setDotCount(prevCount => (prevCount + 1) % (maxDots + 1)); // Cycle through 0 to maxDots
            }, 500); // Adjust the interval for how fast you want the dots to appear

            return () => clearInterval(interval);
        } else {
            setDotCount(0); // Reset dot count when not recording
        }
    }, [isRecording]);

    return (
        <div className="dots-">
            {Array.from({ length: maxDots }, (_, index) => (
                <span key={index} className={`ml-20 text-gray-900 dot ${index < dotCount ? 'active' : ''}`}>
                    •
                </span>
            ))}
        </div>
    );
};

export default RecordingDots;

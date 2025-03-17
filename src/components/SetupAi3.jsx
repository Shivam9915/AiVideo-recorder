import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import baseUrl from '../store.json';
import Navbar from './partials/Navbar';
import Footer from './partials/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useVideo } from '../context/VideoContext';
import { useConsent } from '../context/ConsentContext';
import {BASE_URL} from '../store.json';

const SetupAi3 = () => {
    const { recordedVideo } = useVideo();
    const { consent, setConsent } = useConsent();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const videoRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState('https://placehold.co/40x40');
    const [fileInputVisible, setFileInputVisible] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(0);
    const [overlayMessage, setOverlayMessage] = useState('');
    const [Subscriptionbttn, setSubscriptionbttn] = useState(false)

    // Profile picture functions
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

    useEffect(() => {
        if (recordedVideo && videoRef.current) {
            const videoUrl = URL.createObjectURL(recordedVideo);
            videoRef.current.src = videoUrl;
            videoRef.current.load();
        }
    }, [recordedVideo , location.pathname]);

    const handlePlayPause = () => {
        const videoElement = videoRef.current;
        if (isPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRetake = () => {
        navigate(-1);
    };

    const handleTimeUpdate = () => {
        const videoElement = videoRef.current;
        if (videoElement.duration) {
            const currentProgress = (videoElement.currentTime / videoElement.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleGenerate = async () => {
        if (!consent) {
            setError('You must agree to the terms and conditions before proceeding.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const userId = localStorage.getItem('userId');
            const formData = new FormData();
            if (!recordedVideo) {
                throw new Error('Video blob is not defined.');
            }
            const file = new File([recordedVideo], 'recorded_video.webm', { type: 'video/webm' });
            formData.append('video', file);
            formData.append('user_id', userId);
            formData.append('consent', 'yes');

            const response = await axios.post(
                `${baseUrl.API_URL}/upload_video`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response)

            if (response.status !== 201) {
                throw new Error('Network response was not ok');
            }

            const data = response.data;
            const gender = data.gender;
            localStorage.setItem("gender",gender)

            const videourl =data.video_url
            
            console.log(gender,videourl)

            setTimeout(() => {
                if (data) {
                    navigate(BASE_URL+'/Ai-setup4', { state: {gender,videourl} });
                }
            }, 3000);
        } catch (error) {
            console.error('Error during API call:', error);
            if(error.response.status==403){
                setOverlayMessage(error.response.data.message);

                setShowOverlay(2);
                return;
            }
            if (error.response && error.response.data && error.response.data.error) {
                setOverlayMessage(error.response.data.error);
                setShowOverlay(1);
                setSubscriptionbttn(true);
            } else {
                setOverlayMessage(error.response.data.message);
                setShowOverlay(1);
            }
            setLoading(false);
        }
    };

    const handleProgressClick = (e) => {
        const videoElement = videoRef.current;
        const progressBar = e.currentTarget;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const newTime = (clickPosition / progressBar.clientWidth) * videoElement.duration;
        videoElement.currentTime = newTime;
        setProgress((newTime / videoElement.duration) * 100);
    };

    const closeOverlay = () => {
        setShowOverlay(0);
        setOverlayMessage('');
    };


    return (
        <>
            <div className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 text-white p-4 pb-6'>
                <Navbar
                    profilePicture={profilePicture}
                    onProfilePictureClick={handleProfilePictureClick}
                    onFileChange={handleFileChange}
                    isMobileNavOpen={isMobileNavOpen}
                    toggleMobileNav={toggleMobileNav}
                />
                <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-4'>
                    <video
                        className='w-full h-64 object-cover mb-4 rounded-lg'
                        ref={videoRef}
                        id='video-preview'
                        onTimeUpdate={handleTimeUpdate}
                    />
                    <div className='flex items-center justify-center mb-4'>
                        <button className='text-2xl' onClick={handlePlayPause}>
                            <i className={`fa-solid fa-circle${isPlaying ? '-pause' : '-play'} text-3xl`}></i>
                        </button>
                        <div className='relative w-full ml-4'>
                            <div className='bg-gray-200 rounded h-2 cursor-pointer' onClick={handleProgressClick}>
                                <div className='bg-gray-900 h-full rounded' style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className='form-checkbox text-gray-600'
                            />
                            <span className='ml-2'>
                                I agree to the <Link to={{BASE_URL}+'/terms-and-conditions'} className='underline'>terms and conditions</Link>
                            </span>
                        </label>
                    </div>
                    <div className='flex justify-between gap-x-2'>
                        <button className='border border-gray-400 text-gray-400 px-6 py-2 rounded' onClick={handleRetake}>
                            Retake
                        </button>
                        <button
                      
                            className={`bg-gray-900 text-white px-6 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handleGenerate}
                            disabled={loading}
                        >
                            {loading && showOverlay? (
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
                                    Generating...
                                </span>
                            ) : (
                                "Generate"
                            )}
                        </button>
                    </div>
                    {error && (
                        <p className="flex items-center justify-center text-red-500 mt-2">{error}</p>
                    )}
                </div>
            </div>
            {showOverlay ? (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Error</h2>
                        <p>{overlayMessage}</p>
                       <div className="flex gap-x-5">
                       <button className="w-20 mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={closeOverlay}>
                            Close
                        </button>
                        {showOverlay==2 ?
                        <Link to={{BASE_URL}+'/renew-subscription'} className="w-20 mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={closeOverlay}>
                        Buy
                    </Link> :
                    null
                        }
                       </div>
                    </div>
                </div>
            ) : null}
            <Footer />
        </>
    );
};

export default SetupAi3;

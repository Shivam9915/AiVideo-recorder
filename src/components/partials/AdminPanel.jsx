import React, { useRef, useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { API_URL } from '../../store.json';

const AdminPanel = () => {
    const [profilePicture, setProfilePicture] = useState(
        "https://placehold.co/40x40"
    ); // Default profile picture 
    const [fileInputVisible, setFileInputVisible] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility
    const [metrics, setMetrics] = useState([]); // State to store metrics data
    const optionsMenuRef = useRef(null); // Ref for the options menu

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

    // Fetch metrics data from API
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get(`${API_URL}/dashboard`);
                const data = response.data;

                console.log('API Response:', data); // Log the API response

                const transformedData = [
                    { title: "Total Revenue", value: data.total_revenue, isTotal: true },
                    { title: "Monthly Revenue", value: data.monthly_revenue || "N/A", isTotal: false },
                    { title: "Quarterly Revenue", value: data.quarterly_revenue || "N/A", isTotal: false },
                    { title: "Yearly Revenue", value: data.yearly_revenue, isTotal: false },
                    { title: "Total Videos", value: data.total_videos, isTotal: true },
                    { title: "Monthly Videos", value: data.monthly_videos, isTotal: false },
                    { title: "Quarterly Videos", value: data.quarterly_videos, isTotal: false },
                    { title: "Yearly Videos", value: data.yearly_videos, isTotal: false },
                    { title: "Total Background Videos", value: data.total_bg_videos, isTotal: true },
                    { title: "Monthly Background Videos", value: data.monthly_bg_videos, isTotal: false },
                    { title: "Quarterly Background Videos", value: data.quarterly_bg_videos, isTotal: false },
                    { title: "Yearly Background Videos", value: data.yearly_bg_videos, isTotal: false },
                    { title: "Total Users", value: data.total_users, isTotal: true },
                    { title: "Monthly Users", value: data.monthly_new_user_registered, isTotal: false },
                    { title: "Quarterly Users", value: data.quarterly_new_user_registered, isTotal: false },
                    { title: "Yearly Users", value: data.yearly_new_user_registered, isTotal: false },
                ];

                setMetrics(transformedData);
            } catch (error) {
                console.error('Error fetching metrics:', error);
                setMetrics([]); // Set metrics to an empty array in case of error
            }
        };

        fetchMetrics();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar
                profilePicture={profilePicture}
                onProfilePictureClick={handleProfilePictureClick}
                onFileChange={handleFileChange}
                isMobileNavOpen={isMobileNavOpen}
                toggleMobileNav={toggleMobileNav}
            />
            <h1 className="text-2xl font-bold mt-[5%] mb-6">Admin Panel</h1>

            <div className="flex flex-wrap -mx-3">
                {metrics.map((metric, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6">
                        <div className={`p-4 rounded shadow transition-transform duration-300 ease-in-out 
                            ${metric.isTotal ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg transform hover:scale-105' : 'bg-white hover:bg-gray-100 hover:shadow-lg transform hover:scale-105'}`}>
                            <h2 className="text-lg font-semibold">{metric.title}</h2>
                            <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;

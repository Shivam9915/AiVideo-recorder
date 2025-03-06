import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../store.json';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();


    
    useEffect(() => {
        // Check if user ID is in local storage
        const userId = localStorage.getItem('userId');

        if (userId) {
            // User ID exists, redirect to the trained videos page
            navigate("/trainedvideos");
        }
    }, [navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Invalid Email Address.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        setError("");

        try {
            const response = await axios.post(`${API_URL}/sign_in`, {
                email,
                password,
            });

            if (response.data.success) {

                const { user_id, email: userEmail, video_status } = response.data; // Assuming email is returned in the response
                localStorage.setItem("userId", user_id);

                // Extract the first letter of the email
                const firstLetter = userEmail.charAt(0).toUpperCase(); // Get the first letter and convert to uppercase
                localStorage.setItem("userInitial", firstLetter); // Store it in local storage
                

                // Log in and redirect
                login();

                if (video_status == true) {
                    navigate("/trainedvideos");
                } else {
                    navigate("/Ai-Setup1");
                }
            }
            else{
             setError(response.data.message);
            }
          

            setEmail("");
            setPassword("");

        } catch (err) {
            console.error("Sign-in error:", err);
            setError(err.response.data.message)
           console.log(err.response.data.message);
           
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-white relative">
            <h1 className="text-2xl font-black text-blue-600 absolute top-5 left-5">AiVideo Recorder</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <div className="flex items-center border rounded px-3 py-2 mt-1">
                            <i className="fas fa-envelope text-gray-500"></i>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-2 outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <div className="flex items-center border rounded px-3 py-2 mt-1">
                            <i className="fas fa-lock text-gray-500"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-2 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500"
                            >
                                {showPassword ? (
                                    <i className="fas fa-eye-slash"></i>
                                ) : (
                                    <i className="fas fa-eye"></i>
                                )}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full py-2 text-white bg-blue-500 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                Signing in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
                <p className="text-gray-500 text-center mt-4">
                    Forgot Login Details?{" "}
                    <Link to="/forgot-password" className="text-blue-500 font-semibold">
                        Reset
                    </Link>
                </p>
                <Link to="/register">
                    <button className="w-full py-2 mt-4 border border-blue-500 text-blue-500 rounded">
                        Create an Account
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Login;

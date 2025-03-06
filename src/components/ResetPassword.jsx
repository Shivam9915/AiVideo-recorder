import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../store.json";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the email from localStorage
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      // If no email is found, redirect to the forgot password page
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setLoading(true); // Set loading to true when the request starts

    // Retrieve the email from localStorage
    const email = localStorage.getItem("resetEmail");

    // Validate password
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false); // Reset loading state
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      // Make a POST request to the reset password route with OTP, new password, and email
      const response = await axios.post(`${baseUrl.API_URL}/reset_password`, {
        email,
        otp,
        new_password: newPassword,
      });

      if (response.data.success) {
        setMessage("Your password has been reset successfully.");
        // Optionally redirect to login page after a delay
        setTimeout(() => {
          // Clear the email from localStorage after successful reset
          localStorage.removeItem("resetEmail");
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Failed to reset password");
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div className="flex items-center justify-center h-screen rounded-lg bg-white border-[2px] overflow-hidden">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg h-screen border-[2px]">
        <img
          src="/src/assets/asset1.png"
          alt="Illustration of a person standing in front of a large screen with various icons and graphics"
          className="w-full h-60 mb-3"
        />
        <p className="text-center text-[#4C4C50] mb-2 w-[80%] font-[500] text-[20px]">
          Enter the OTP and your new password below.
        </p>

        <form className="w-full" onSubmit={handleResetPassword}>
          <div className="flex items-center p-2 mb-2 bg-gray-100 rounded">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 bg-transparent outline-none"
              required
            />
          </div>
          <div className="flex items-center p-2 mb-2 bg-gray-100 rounded">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 bg-transparent outline-none"
              required
            />
          </div>
          <div className="flex items-center p-2 mb-2 bg-gray-100 rounded">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 bg-transparent outline-none"
              required            />
              </div>
              {error && <p className="flex items-center justify-center text-red-500">{error}</p>}
              {message && <p className="text-green-500">{message}</p>}
              <button
                type="submit"
                className={`w-full p-3 text-white bg-black rounded mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? "  Reseting..." : "Reset Password"} {/* Show loading text */}
              </button>
            </form>
            
            <p className="font-[500] text-[#7C7D86] text-[18px] mt-1">
              Remembered your password?{" "}
              <Link to="/login" className="text-[#141515] font-[500] text-[18px]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      );
    };
    
    export default ResetPassword;
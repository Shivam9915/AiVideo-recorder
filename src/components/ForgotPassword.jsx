import React, { useState } from "react";
import axios from "axios"; 
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);
    setMessage("");
    setLoading(true); // Set loading to true when the request starts

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      // Make a POST request to the forgot password route
      const response = await axios.post("http://192.168.1.2:5000/api/send_otp", { email });
      
      // Assuming the API responds with a success message
      if (response.data.success) {
        setMessage("If an account with that email exists, a password reset link has been sent.");
        
        // Store the email in localStorage
        localStorage.setItem("resetEmail", email);
        
        // Redirect to the reset password page
        navigate("/reset-password");
      }
    } catch (err) {
      console.error("Error sending reset email:", err);
      setError("Please try again.");
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] rounded-lg bg-white border-[2px] ">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg min-h-screen border-[2px">
        <img src="/src/assets/asset1.png" alt="Illustration" className="w-full h-60 mb-6" />
        <p className="text-center text-[#4C4C50] mb-6 w-[80%] font-[500] text-[20px]">
          Enter your email to reset your password.
        </p>
        <form className="w-full mb-4" onSubmit={handleReset}>
          <div className="flex items-center p-2 mb-6 bg-gray-100 rounded">
            <i className="fas fa-envelope text-gray-500 mr-2"></i>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              type="text" 
              placeholder="Email" 
              className="w-full p-2 bg-transparent outline-none" 
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4 ml-16">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}
          <button 
            type="submit" 
            className={`w-full p-3 mb-4 mt-10 text-white bg-black rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending..." : "Reset"} {/* Show loading text */}
          </button>
        </form>
        <p className="font-[500] text-[#7C7D86] text-[18px] mb-4">
          Remembered your password? <Link to="/login" className="text-[#141515] font-[500] text-[18px]">Sign In</Link>
        </p>
      </div>  
    </div> 
  );
};

export default ForgotPassword;
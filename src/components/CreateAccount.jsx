import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../store.json';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CustomGoogleSignInButton from "./partials/CustomGoogleSigninButton";
import { signInWithGoogle } from "./firbase/firbaseConfig";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/register_user`,{
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("userId", email);
        setSuccess("Check your email for verification.");
        navigate("/verification");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const email = result.user.email;
      const response = await axios.post(`${API_URL}/register_user_google`, { email });
      console.log(response.data);

      if (response.data.success) {
        const { user_id, email: userEmail, video_status } = response.data;
        localStorage.setItem("userId", user_id);

        const firstLetter = userEmail.charAt(0).toUpperCase();
        localStorage.setItem("userInitial", firstLetter);
        
        // Use state to trigger navigation after updates
        if (video_status === 1) {
          setSuccess("Redirecting to trained videos...");
          navigate("/trainedvideos");
        } else {
          setSuccess("Redirecting to AI setup...");
          navigate("/Ai-Setup1");
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("Google sign-in failed.");
    }
  };

  // Add useEffect to handle navigation based on success message
  useEffect(() => {
    if (success.includes("Redirecting")) {
      setTimeout(() => {
        if (success.includes("trained videos")) {
          navigate("/trainedvideos");
        } else {
          navigate("/Ai-Setup1");
        }
      }, 1000); // Delayed navigation to avoid flicker
    }
  }, [success, navigate]);

  return (
    <GoogleOAuthProvider clientId="407069747339-f8hrgr23il9nuitpl60nkmncr1sr6og5.apps.googleusercontent.com">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-blue-200 to-white">
        <h1 className="text-2xl font-black text-blue-600 absolute top-5 left-5">
          AiVideo Recorder
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-xl text-gray-500 font-medium">Welcome to</h1>
            <h2 className="text-2xl font-extrabold text-gray-900">
              AiVideo Recorder
            </h2>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 p-2 rounded">
                <i className="fas fa-envelope text-gray-500"></i>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-transparent outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 p-2 rounded">
                <i className="fas fa-lock text-gray-500"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-transparent outline-none"
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
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 p-2 rounded">
                <i className="fas fa-lock text-gray-500"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 bg-transparent outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500"
                >
                  {showConfirmPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded mb-4"
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
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v2a6 6 0 100 12v2a8 8 0 01-8-8z"
                    />
                  </svg>
                  Registering...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <p className="text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-semibold">
              Sign In
            </Link>
          </p>
          <div className="text-center mt-4">
            <p className="text-gray-500">or</p>
            <CustomGoogleSignInButton
              onSuccess={()=>handleGoogleSignIn()}
              onError={() => setError("Google sign-in failed.")}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default CreateAccount;

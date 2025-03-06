import React from "react";
import { useGoogleLogin } from '@react-oauth/google';

const CustomGoogleSignInButton = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess,
    onError,
  });

  return (
    <button
      onClick={login}
      className="w-full p-2 text-white bg-red-500 rounded mt-2 flex items-center justify-center"
    >
      <i className="fab fa-google mr-2"></i> Sign in with Google
    </button>
  );
};

export default CustomGoogleSignInButton;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import{API_URL} from "../store.json"

const Verification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Retrieve the email from local storage
        const storedEmail = localStorage.getItem('userId');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input
            if (value && index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    console.log(email)
    const handleSubmit = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length === otp.length && /^[0-9]+$/.test(fullOtp)) {
            try {
                console.log(email,fullOtp);
                const response = await axios.post(`${API_URL}/verify_otp`, { email, entered_otp: fullOtp },
                    {headers:{
                        'Content-Type': 'application/json',
                    }}
                );
                
                
                if (response.data.success) {
                    navigate('/login');
                } else {
                    setSuccess('Invalid OTP');
                }
            } catch (error) {
                console.error('Error validating OTP:', error);
                alert('An error occurred while validating the OTP. Please try again later.');
            }
        } else {
            // Handle error for invalid OTP length
            console.error('Invalid OTP');
            setSuccess('Please enter a valid OTP.');
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen w-screen overflow-hidden bg-gradient-to-t from-blue-200 to-white">
                  <h1 class="text-2xl font-black text-blue-600 absolute top-5 left-5">
        AiVideo Recorder
      </h1>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-2xl h-[80vh]">
                <img src="/src/assets/asset1.png" alt="Illustration" className="h-[166px] w-[218.09px] mb-4 ml-5" />
                <h1 className="text-[26px] mb-2 font-[600]">Verification</h1>
                <p className="mb-6 text-center w-[90] font-[500] text-[#4c4c50] text-[18px]">Please Enter the Verification Code Sent to Your Email</p>
                <div className="flex space-x-2 mb-6">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            name='entered_otp'
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>
                {success && <p className="text-red-500 mb-1">{success}</p>}
                <button
                    onClick={handleSubmit}
                    disabled={otp.some((digit) => digit === '')}
                    className="w-[94%] py-3 bg-blue-500 text-white rounded-md font-[700] text-[20px]"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Verification;
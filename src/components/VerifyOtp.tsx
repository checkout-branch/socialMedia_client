import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Enter OTP</h1>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span className="mx-1 text-xl">   </span>}
          renderInput={(props) => (
            <input
              {...props}
              className=" text-center text- border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              style={{width: '80px', height:'80px'}}
            />
          )}
        />
      </div>
    </div>
  );
}

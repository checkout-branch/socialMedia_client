'use client'

import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

import Button from './button/Button'; // Assuming Button component is in the same folder
import { useRouter, useSearchParams } from 'next/navigation';
import { OtpVerifyApi } from '@/service/auth';
import { toast } from 'react-toastify';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  

  const handleOtpVerify = async () => {
    console.log(email);
    console.log(typeof otp);
  
    try {
      // Convert OTP to a number before sending it to the backend
      const values = { email, otp: Number(otp) };
      const response = await OtpVerifyApi(values);
      console.log(values)
  
      if (response.success && otp.length === 4) {
        // Simulate OTP verification
        toast.success(response?.message);
        router.push('/auth/login'); // Redirect to the login page
      } else {
        toast.warn(response?.message);
      }
    } catch (error) {
      console.log('Error during OTP verification:', error);
    }
  };
  

  return (
    <div >
      <div className="w-full max-w-md rounded-lg ">
        <h1 className="text-3xl font-bold text-white  mb-6">Verify Your Email</h1>
        <p className="text-gray-400 text-sm mb-6">Enter the OTP sent to your email to proceed.</p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span className="mx-7 text-xl text-white"> </span>}
          renderInput={(props) => (
            <input
              {...props}
              className="text-center text-white bg-[#1a1c26]  rounded-md focus:outline-none w-16 h-16 m-2 ml-0"
              style={{ width: '52px', height: '52px' }}
            />
          )}
        />

        <div className="mt-6">
          <Button
            text="Verify OTP"
            onClick={handleOtpVerify}
            isDisabled={otp.length !== 4} // Disable button if OTP is not 4 characters
            variant="primary" // Set the variant to 'primary'
            size="medium" // Set the size to 'medium'
            label="Verify OTP" // Accessibility label
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Didn&apos;t receive the OTP?{' '}
          <button className="text-blue-500 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
}

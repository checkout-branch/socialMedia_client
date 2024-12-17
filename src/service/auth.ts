/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import { AxiosError } from 'axios';

export const registerApi = async (values: any) => {
  try {
    const res = await api.post('/user/register', values);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // Return the error message or any other relevant error information
      return {
        message: err.response?.data?.message || 'Something went wrong during registration',
      };
    } else {
      // Handle non-Axios errors
      return {
        success: false,
        message: 'An unknown error occurred',
      };
    }
  }
};


export const OtpVerifyApi = async(values: any) => {
    try {
        const res = await api.post('/user/otpverification',values)        
        return res.data
        
    } catch (err) {
        if (err instanceof AxiosError) {
          // Return the error message or any other relevant error information
          return {
            message: err.response?.data?.message || 'Something went wrong during registration',
          };
        } else {
          // Handle non-Axios errors
          return {
            success: false,
            message: 'An unknown error occurred',
          };
        }
      }
}

export const loginApi = async (values: any) => {
    try {
        const res = await api.post('/user/login',values)
        
        if (res.data.token) {
            sessionStorage.setItem('Access_token', res.data.token ,); // Expires in 1 day
        }
        if(res.data.user){
          sessionStorage.setItem('user',JSON.stringify(res.data.user))
        }
        return res.data
        
    }  catch (err) {
        if (err instanceof AxiosError) {
          // Return the error message or any other relevant error information
          return {
            message: err.response?.data?.message || 'Something went wrong during registration',
          };
        } else {
          // Handle non-Axios errors
          return {
            success: false,
            message: 'An unknown error occurred',
          };
        }
      }
}



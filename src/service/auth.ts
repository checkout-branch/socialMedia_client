import api from './api';

export const registerApi = async (values: any) => {
  try {
       const res = await api.post('/user/register', values);
       return res.data;
  } catch (err) {
       throw new Error('Registration failed');
  }
};

export const OtpVerifyApi = async(values: any) => {
    try {
        const res = await api.post('/user/otpverification',values)        
        return res.data
        
    } catch (error) {
        throw new Error('Registration failed');
    }
}

export const loginApi = async (values: any) => {
    try {
        const res = await api.post('/user/login',values)
        return res.data
        
    } catch (error) {
        throw new Error ('Login faild')
    }
}

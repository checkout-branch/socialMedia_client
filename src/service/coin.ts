import { AxiosError } from "axios";
import api from "./api";

export const getCoinApi = async ()=>{
    try {
        const res = await api.get('/user/purchasecoin')
        return res.data
    } catch (err) {
        if (err instanceof AxiosError) {
          // Return the error message or any other relevant error information
          return {
            message: err.response?.data?.message || 'Something went wrong fetching coin',
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

export const getCoinByIdApi = async (id:string)=>{
    try {
      const res =await api.get(`/user/purchasecoin/${id}`)
      return res.data
    } catch (error) {
      throw new Error('erro from fetch coin by id')
    }
}


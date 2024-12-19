import { AxiosError } from "axios"
import api from "./api"

export const getPostApi = async()=>{
try {
    const res = await api.get('/user/posts')
    return res.data
} catch (error) {
    console.log(error)
    throw error
}
}


export const createPostApi = async (formData: FormData ,id:string)=>{
  
    try {
        const res = await api.post (`/user/createpost/${id}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
              }
        })
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


export const likeToggleApi = async (userId:string,postId:string)=>{
  try {
    const res = await api.post('/user/posts/like',{userId,postId})
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
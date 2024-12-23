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

export const getPostByIdApi = async (id:string) =>{
  try {
    const res = await api.get(`/user/post/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
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


export const likeStatusApi = async(userId:string,posId:string)=>{
  try {
    const res = await api.get(`/user/posts/${posId}/user/${userId}/likestatus`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}


// export const getCommentsApi = async(id:string)=>{
//   try {
//     const res = await api.get(`/user/comments?postId=${id}`)
//     return res.data
//   } catch (error) {
//     console.log(error)
//   }
// }

export const addCommentApi = async ( authorId: string,postId: string, content: string)=>{
  try {
    const res =await api.post('/user/comments',{authorId,postId,content})
    console.log(res);
    return res
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

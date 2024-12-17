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
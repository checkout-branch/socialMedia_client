import api from "./api"

export const getAllUser = async() =>{
    try {
        const res = await api.get('/user/users')
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUserById = async(id:string) =>{
    try {
        const res = await api.get(`/user/users/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
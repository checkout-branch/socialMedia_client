import api from "./api"

export const getTournamentApi = async () =>{
    try {
        const res = await api.get('/user/gettournaments')
        return res.data
    } catch (error) {
        throw new Error('Something error from getting tournaments')
    }
}
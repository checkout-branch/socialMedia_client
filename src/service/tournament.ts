import { AxiosError } from "axios";
import api from "./api";

export const getTournamentApi = async () => {
  console.log('aksdnfla');
  try {
    const res = await api.get("/user/tournaments");
    return res.data;
  } catch (error) {

    console.log(error); ;
  }
};

export const getTournamentByIdApi = async (id: string) => {
  try {
    const res = await api.get(`/user/tournaments/${id}`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // Return the error message or any other relevant error information
      return {
        message:
          err.response?.data?.message || "Something went wrong fetching coin",
          
      };
    } else {
      // Handle non-Axios errors
      return {
        success: false,
        message: "An unknown error occurred",
      };
    }
  }
};

export const createTournament = async (formData: FormData, id: string)=>{
  try {
    const res = await api.post(`/user/createtournament/${id}`, formData,);
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
}

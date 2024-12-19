import { AxiosError } from "axios";
import api from "./api";

export const followApi = async (userId: string, followId: string) => {
  try {
    const res = await api.post(`/user/users/${userId}/follow/${followId}`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // Return the error message or any other relevant error information
      return {
        message:
          err.response?.data?.message ||
          "Something went wrong during registration",
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

export const unFollowApi = async (userId: string, followId: string) => {
  try {
    const res = await api.delete(`/user/users/${userId}/unfollow/${followId}`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // Return the error message or any other relevant error information
      return {
        message:
          err.response?.data?.message ||
          "Something went wrong during registration",
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

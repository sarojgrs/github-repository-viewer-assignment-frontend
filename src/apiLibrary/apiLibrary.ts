import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // Authorization: "Bearer ACCESS_TOKEN",
    "Content-Type": "application/json",
  },
});

export const get = async <T>(url: string, params?: any): Promise<T> => {
  try {
    const response: AxiosResponse<{ status: string; data: T }> =
      await instance.get(url, { params });

    // Extract the data field from the response
    return response.data.data;
  } catch (error) {
    console.error(`Error in GET request to ${url}:`, error);
    throw error;
  }
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  try {
    const response: AxiosResponse<{ status: string; data: T }> =
      await instance.post(url, data);

    // Extract the data field from the response
    return response.data.data;
  } catch (error) {
    console.error(`Error in POST request to ${url}:`, error);
    throw error;
  }
};

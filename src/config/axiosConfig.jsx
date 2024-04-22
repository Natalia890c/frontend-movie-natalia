import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: import.meta.env.PORT || "https://backend-movie-natalia-2.onrender.com",
});

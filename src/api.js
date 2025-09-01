import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const RAILWAY = process.env.VITE.API.URL;
const api = axios.create({
  baseURL: RAILWAY,
  withCredentials: true
})

export const registerUser = (userData) => api.post("/signup", userData);
export const loginUser = (userData) => api.post("/login", userData)
export const getProfile = () => api.get("a/profile");
export const getDashboard = () => api.get("a/dashboard");
export const logoutUser = () => api.post("a/logout");
export default api;
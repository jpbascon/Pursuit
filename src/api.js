import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export const registerUser = (userData) => api.post("/signup", userData);
export const loginUser = (userData) => api.post("/login", userData)
export const getProfile = () => api.get("a/profile");
export const getDashboard = () => api.get("a/dashboard");
export const logoutUser = () => api.post("a/logout");
export default api;
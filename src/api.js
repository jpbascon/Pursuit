import axios from "axios";

const api = axios.create({
  baseURL: "https://pursuit-production.up.railway.app/",                          // Change this to https://pursuit-production.up.railway.app/ after
  withCredentials: true
})

export const registerUser = (userData) => api.post("/signup", userData);
export const loginUser = (userData) => api.post("/login", userData)
export const getProfile = () => api.get("a/profile");
export const getDashboard = () => api.get("a/dashboard");
export const logoutUser = () => api.post("a/logout");
export default api;
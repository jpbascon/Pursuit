import axios from "axios";

const isProduction = import.meta.env.NODE_ENV === "production";
const api = axios.create({
  baseURL: isProduction ?
    "https://pursuit-production.up.railway.app/" :
    "http://localhost:5000/",
  withCredentials: true
})

export const registerUser = (userData) => api.post("/signup", userData);
export const verifyEmail = () => api.get("/verify",);
export const loginUser = (userData) => api.post("/login", userData)
export const getProfile = () => api.get("a/profile");
export const getDashboard = () => api.get("a/dashboard");
export const logoutUser = () => api.post("a/logout");
export const contact = (formData) => api.post("/contact", formData);
export const forgotPassword = (email) => api.post("/forgot-password", { email });
export const verifyOtp = (otp) => api.post("/verify-otp", { otp });
export const resetPassword = (password, passwordConfirm) => api.put("/reset-password", { password, passwordConfirm });
export default api;
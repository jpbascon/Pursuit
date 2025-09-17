import axios from "axios";

const isProduction = import.meta.env.MODE === "production";
const api = axios.create({
  baseURL: isProduction ? "https://pursuit-production.up.railway.app/" : "http://localhost:5000/",
  withCredentials: true
})

export const registerUser = (userData) => api.post("a/signup", userData);
export const verifyEmail = () => api.get("a/verify",);
export const loginUser = (formData) => api.post("a/login", formData)
export const authCheck = () => api.get("a/auth-check")
export const getProfile = () => api.get("a/me");
export const logoutUser = () => api.post("a/logout");
export const contact = (formData) => api.post("a/contact", formData);
export const forgotPassword = (email) => api.post("a/forgot-password", { email });
export const verifyOtp = (otpString) => api.post("a/verify-otp", { otp: otpString });
export const resetPassword = (password, passwordConfirm) => api.put("a/reset-password", { password, passwordConfirm });
export const addGoal = (data) => api.post("a/add-goal", data);
export const deleteGoal = (id) => api.delete(`a/delete-goal/${id}`);
export const userGoalCheck = () => api.get("a/user-goal-check");
export default api;
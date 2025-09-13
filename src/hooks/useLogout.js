import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/Alert";

export default function useLogout(setIsLoggedIn) {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const logout = async () => {
    try {
      const res = await logoutUser();
      showAlert(res.data.message);
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      setIsLoggedIn(true);
      showAlert(err.response?.data?.error || "Logout failed");
    }
  }
  return { logout }
}
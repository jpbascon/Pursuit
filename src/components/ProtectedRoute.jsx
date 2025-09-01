import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/a/dashboard");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuth === null) return <p className="text-black mt-[10%] text-7xl bold">Loading...</p>;
  return isAuth ? children : <Navigate to="/dashboard" />;
}
export default ProtectedRoute;
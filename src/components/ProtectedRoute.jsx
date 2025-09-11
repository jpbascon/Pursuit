import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authCheck } from "../api";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authCheck();
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuth === null) return <div>
    <img
      src="/landingBg.jpg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover brightness-18 pointer-events-none z-1" />
    <p className="pt-40 text-4xl bold">Loading...</p>
  </div>;
  return isAuth ? children : <Navigate to="/" />
}
export default ProtectedRoute;
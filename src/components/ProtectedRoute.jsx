import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn === null) {
    return (
      <div>
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-18 pointer-events-none z-1"
        />
        <p className="pt-40 text-4xl bold">Loading...</p>
      </div>
    );
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

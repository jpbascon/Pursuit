import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";
import { useAlert } from "../context/Alert.jsx";

const Navbar = ({ setIsLoggedIn, isLoggedIn }) => {
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
  return (
    <>
      <div className="flex justify-between sticky inset-x-0 top-0 h-[80px] px-60 z-500">
        {isLoggedIn ?
          <NavLink to="/dashboard" className="flex justify-center items-center">
            <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#e8e6e3" fontSize="42" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
            </svg>
          </NavLink>
          :
          <NavLink to="/" className="flex justify-center items-center">
            <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#e8e6e3" fontSize="42" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
            </svg>
          </NavLink>}
        <div className="flex gap-8 justify-center items-center noto-font">
          {isLoggedIn ?
            <div className="flex gap-3 text-sm">
              <button
                onClick={() => logout()}
                className="border-[2px] border-[#b1afac] px-2 py-1 rounded-sm font-bold hover:text-black hover:bg-white hover:border-white welcome-buttons">
                Logout
              </button>
            </div>
            :
            <div className="flex gap-3 items-center text-sm">
              <NavLink to="/login" className="text-neutral-400 hover:text-neutral-100 transition-text duration-300 font-bold">Log In</NavLink>
              <NavLink to="/signup" className="border-[2px] border-[#b1afac] px-2 py-1 rounded-sm font-bold hover:text-black hover:bg-white hover:border-white welcome-buttons">Sign up</NavLink>
            </div>}
        </div>
      </div >
    </>
  )
}

export default Navbar;
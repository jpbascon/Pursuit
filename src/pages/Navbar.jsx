import { NavLink } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser.js";

const Navbar = ({ isLoggedIn, createGoal, setCreateGoal }) => {
  const { name } = useFetchUser(isLoggedIn);
  return (
    <>
      <div>
        <div className={`${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className={`flex inset-x-0 top-0 h-[80px] z-100 ${isLoggedIn ? "pr-27 fixed bg-black justify-end border-b-[1px] border-b-[#333843] transition-all duration-200" : "sticky justify-between px-50"}`}>
            {!isLoggedIn &&
              <NavLink to="/dashboard" className="flex justify-center items-center">
                <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#e8e6e3" fontSize="42" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
                </svg>
              </NavLink>}
            {isLoggedIn ?
              <div className="flex justify-center items-center gap-3">
                <button
                  className="p-2 flex gap-1 font-bold montserrat-font text-sm rounded-sm bg-white text-black hover:brightness-80 active:brightness-60 transition-all duration-250"
                  onClick={() => { setCreateGoal(true) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
                    <path fill="currentColor" d="M31 24h-4v-4h-2v4h-4v2h4v4h2v-4h4z" />
                    <path fill="currentColor" d="M25 5h-3V4a2.006 2.006 0 0 0-2-2h-8a2.006 2.006 0 0 0-2 2v1H7a2.006 2.006 0 0 0-2 2v21a2.006 2.006 0 0 0 2 2h10v-2H7V7h3v3h12V7h3v9h2V7a2.006 2.006 0 0 0-2-2m-5 3h-8V4h8Z" />
                  </svg>
                  Create New Goal</button>
                <p className="montserrat-font font-bold">{name}</p>
              </div>
              :
              <div className="flex gap-3 items-center text-sm">
                <NavLink to="/login" className="text-neutral-400 hover:text-neutral-100 transition-text duration-300 font-bold">Log In</NavLink>
                <NavLink to="/signup" className="border-[2px] border-[#b1afac] px-2 py-1 rounded-sm font-bold hover:text-black hover:bg-white hover:border-white welcome-buttons">Sign up</NavLink>
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
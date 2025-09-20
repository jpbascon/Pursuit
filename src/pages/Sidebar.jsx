import { NavLink } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { CalendarDays, FolderOpenDot, SquareCheckBig, Bolt } from "lucide-react"

export default function Sidebar({ setIsLoggedIn, createGoal }) {
  const { logout } = useLogout(setIsLoggedIn);
  return (
    <>
      <div className={`fixed left-0 top-0 bottom-0 w-[270px] bg-black border-r-1 border-r-[#333843] z-101 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
        <div className="flex flex-col gap-6 py-2 h-full">
          <NavLink to="/dashboard" className="flex justify-center items-center">
            <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#e8e6e3" fontSize="42" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
            </svg>
          </NavLink>
          <div className="pb-4 flex flex-col justify-between h-full">
            <div className="gap-[4px] px-2 flex-1 flex flex-col items-stretch">
              <NavLink to="/dashboard"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <CalendarDays width={22} height={22} />
                <p className="noto-font font-medium relative text-sm montserrat-font">Dashboard</p>
              </NavLink>
              <NavLink to="/goals"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <FolderOpenDot width={22} height={22} />
                <p className="noto-font font-medium relative text-sm montserrat-font">Projects</p>
              </NavLink>
              <NavLink to="/tasks"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <SquareCheckBig width={22} height={22} />
                <p className="noto-font font-medium relative text-sm montserrat-font">Tasks</p>
              </NavLink>
              <NavLink to="/settings"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <Bolt width={22} height={22} />
                <p className="noto-font font-medium relative text-sm montserrat-font">Settings</p>
              </NavLink>
            </div>
            <div className="flex gap-[4px] px-2">
              <button className="flex-1 flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200"
                onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 20.75H6a2.64 2.64 0 0 1-2.75-2.53V5.78A2.64 2.64 0 0 1 6 3.25h3a.75.75 0 0 1 0 1.5H6a1.16 1.16 0 0 0-1.25 1v12.47a1.16 1.16 0 0 0 1.25 1h3a.75.75 0 0 1 0 1.5Zm7-4a.74.74 0 0 1-.53-.22a.75.75 0 0 1 0-1.06L18.94 12l-3.47-3.47a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.74.74 0 0 1-.53.22" />
                  <path fill="currentColor" d="M20 12.75H9a.75.75 0 0 1 0-1.5h11a.75.75 0 0 1 0 1.5" />
                </svg>
                <p className="noto-font font-medium relative text-sm montserrat-font">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
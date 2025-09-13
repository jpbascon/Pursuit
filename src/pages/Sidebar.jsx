import { NavLink } from "react-router-dom"
import useLogout from "../hooks/useLogout"

export default function Sidebar({ setIsLoggedIn, createGoal }) {
  const { logout } = useLogout(setIsLoggedIn);
  return (
    <>
      <div className={`fixed left-0 top-0 bottom-0 w-[270px] bg-black border-r-1 border-r-[#333843] z-101 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
        <div className="flex flex-col gap-10 py-2 h-full">
          <NavLink to="/dashboard" className="flex justify-center items-center">
            <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#e8e6e3" fontSize="42" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
            </svg>
          </NavLink>
          <div className="pb-4 flex flex-col justify-between h-full">
            <div className="gap-[4px] px-2 flex-1 flex flex-col items-stretch">
              <NavLink to="/dashboard"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942m8.818-.001a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75" />
                </svg>
                <p className="noto-font relative text-sm montserrat-font">Dashboard</p>
              </NavLink>
              <NavLink to="/goals"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14m0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4" /><path fill="currentColor" d="M16 24a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8m0-14a6 6 0 1 0 6 6a6.007 6.007 0 0 0-6-6" />
                  <circle cx="16" cy="16" r="2" fill="currentColor" /></svg>
                <p className="noto-font relative text-sm montserrat-font">Goals</p>
              </NavLink>
              <NavLink to="/tasks"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
                  <path fill="currentColor" d="m14 20.18l-3.59-3.59L9 18l5 5l9-9l-1.41-1.42z" />
                  <path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" /></svg>
                <p className="noto-font relative text-sm montserrat-font">Tasks</p>
              </NavLink>
              <NavLink to="/settings"
                className={({ isActive }) => "flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200" + (isActive ? " bg-[#262a33]" : "")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M27 16.76v-1.53l1.92-1.68A2 2 0 0 0 29.3 11l-2.36-4a2 2 0 0 0-1.73-1a2 2 0 0 0-.64.1l-2.43.82a11.35 11.35 0 0 0-1.31-.75l-.51-2.52a2 2 0 0 0-2-1.61h-4.68a2 2 0 0 0-2 1.61l-.51 2.52a11.48 11.48 0 0 0-1.32.75l-2.38-.86A2 2 0 0 0 6.79 6a2 2 0 0 0-1.73 1L2.7 11a2 2 0 0 0 .41 2.51L5 15.24v1.53l-1.89 1.68A2 2 0 0 0 2.7 21l2.36 4a2 2 0 0 0 1.73 1a2 2 0 0 0 .64-.1l2.43-.82a11.35 11.35 0 0 0 1.31.75l.51 2.52a2 2 0 0 0 2 1.61h4.72a2 2 0 0 0 2-1.61l.51-2.52a11.48 11.48 0 0 0 1.32-.75l2.42.82a2 2 0 0 0 .64.1a2 2 0 0 0 1.73-1l2.28-4a2 2 0 0 0-.41-2.51ZM25.21 24l-3.43-1.16a8.86 8.86 0 0 1-2.71 1.57L18.36 28h-4.72l-.71-3.55a9.36 9.36 0 0 1-2.7-1.57L6.79 24l-2.36-4l2.72-2.4a8.9 8.9 0 0 1 0-3.13L4.43 12l2.36-4l3.43 1.16a8.86 8.86 0 0 1 2.71-1.57L13.64 4h4.72l.71 3.55a9.36 9.36 0 0 1 2.7 1.57L25.21 8l2.36 4l-2.72 2.4a8.9 8.9 0 0 1 0 3.13L27.57 20Z" /><path fill="currentColor" d="M16 22a6 6 0 1 1 6-6a5.94 5.94 0 0 1-6 6m0-10a3.91 3.91 0 0 0-4 4a3.91 3.91 0 0 0 4 4a3.91 3.91 0 0 0 4-4a3.91 3.91 0 0 0-4-4" />
                </svg>
                <p className="noto-font relative text-sm montserrat-font">Settings</p>
              </NavLink>
            </div>
            <div className="flex gap-[4px] px-2">
              <button className="flex-1 flex items-center gap-3 py-[8px] px-[6px] rounded-lg hover:bg-[#262a33] transition-bg duration-200"
                onClick={logout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M77.155 272.034H351.75v-32.001H77.155l75.053-75.053v-.001l-22.628-22.626l-113.681 113.68l.001.001h-.001L129.58 369.715l22.628-22.627v-.001z" />
                  <path fill="currentColor" d="M160 16v32h304v416H160v32h336V16z" /></svg>
                <p className="noto-font relative text-sm montserrat-font">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
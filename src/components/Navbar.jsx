import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between sticky inset-x-0 top-0 h-[80px] px-[8.5%] bg-neutral-900 z-500">
        <NavLink to="/" className="flex justify-center items-center">
          <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="#FFF" fontSize="42" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
          </svg>
        </NavLink>
        <div className="flex gap-8 justify-center items-center right-nav">
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      </div>
    </>
  )
}

export default Navbar;
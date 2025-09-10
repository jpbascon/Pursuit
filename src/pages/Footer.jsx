import { NavLink } from 'react-router-dom';

const Footer = ({ createGoal, setCreateGoal }) => {
  return (
    <>
      <div onClick={() => { setCreateGoal(false) }}>
        <div className={`bg-[#e8e6e3] relative z-10 py-4 transition-all duration-200 ${createGoal && "blur-sm brightness-50 pointer-events-none"}`}>
          <div className="flex items-center justify-around w-full text-black">
            <div className="gap-1 flex flex-col items-start disabled:cursor-not-allowed">
              <svg width="150" height="40" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none">
                <text x="45%" y="50%" dominantBaseline="central" textAnchor="middle" fill="black" fontSize="62" fontWeight="bold" fontStyle="italic" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.02em">Pursuit</text>
              </svg>
              {/* <p className="italic text-xl">where brave minds connect</p> */}
            </div>
            <div className="flex gap-2 regular-font font-bold text-xl italic">
              <NavLink to="/about" className="footer-link">About</NavLink>
              •
              <NavLink to="/contact" className="footer-link">Contact</NavLink>
            </div>
            <p>© 2025 <span className="italic">Pursuit</span>. All rights reserved.</p>
          </div>
        </div >
      </div>
    </>
  );
}

export default Footer;
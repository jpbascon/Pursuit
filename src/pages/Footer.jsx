import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="bg-[#111313] relative z-10">
        <div className="py-6 flex justify-between items-center w-full max-w-7xl mx-auto">
          <p>© 2025 Pursuit. All rights reserved.</p>
          <p>
            <a className="hover:underline"
              href="https://github.com/jpbascon" target="_blank">{"</>"}</a>
          </p>
        </div>
      </div >
    </>
  );
}

export default Footer;
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  return (
    <>
      <div className="relative px-[10%] py-[10%] flex flex-col min-h-screen">
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-35 pointer-events-none" />
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full">
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Create your account</h1>
          </div>
          <form className="flex flex-col gap-[1rem] w-[50%]">
            <div className="flex flex-col">
              <label to="email">
                Email
              </label>
              <input
                className="border-1 border-white resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <label to="password">
                Password
              </label>
              <input
                type="password"
                className="border-1 border-white resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="password"
              />
            </div>
            <div className="flex flex-col">
              <label to="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                className="border-1 border-white resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="confirmPassword"
              />
              <div className="text-end">Already have an account?&nbsp;
                <button
                  type="button"
                  className="underline"
                  onClick={() => { navigate('/login'); }}>
                  Log in
                </button>
              </div>
            </div>
            <div className="mt-[2rem] flex flex-col">
              <button className="my-auto border-1 border-white text-white text-lg px-[2rem] py-[1.3rem] rounded-xs hover:bg-white hover:text-black transition-all cursor-pointer">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;
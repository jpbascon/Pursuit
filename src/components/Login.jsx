import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
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
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Welcome back</h1>
          </div>
          <form className="flex flex-col gap-[1rem] w-[50%]">
            <div className="flex flex-col">
              <label to="email">
                Email
              </label>
              <input
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <label to="password">
                Password
              </label>
              <input
                type="password"
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="password"
              />
              <div className="flex justify-between">
                <p>Forgot your password?&nbsp; <button
                  type="button"
                  className="underline italic"
                  onClick={() => { navigate('/forgot-password'); }}
                >
                  Reset password
                </button></p>
                <p>Don't have an account?&nbsp; <button
                  type="button"
                  className="underline italic"
                  onClick={() => { navigate('/signup'); }}>
                  Sign up
                </button></p>
              </div>
            </div>
            <div className="gap-1 mt-[2rem] flex flex-col">
              <button type="submit" className="my-auto border-1 border-[#e8e6e3] text-lg px-[2rem] py-[1.3rem] rounded-xs hover:bg-[#e8e6e3] hover:text-black transition-all cursor-pointer">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;
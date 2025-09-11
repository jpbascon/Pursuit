import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from "../api.js";
import { getProfile } from '../api.js';
import { useAlert } from '../context/Alert.jsx';

const Login = ({ setIsLoggedIn }) => {
  const { showAlert } = useAlert();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [btnStyle, setBtnStyle] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      showAlert(res.data.message);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (err) {
      setIsLoggedIn(false);
      showAlert(err.response?.data?.error || "Something went wrong");
    }
  }
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getProfile();
        showAlert(res.data.message);
        setIsLoggedIn(true);
        navigate('/dashboard');
      } catch (err) {
        console.log("No session found");
      }
    }
    checkAuth();
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    if (!formData.email || !formData.password) setBtnStyle(false);
    else setBtnStyle(true);
  }, [formData])
  return (
    <>
      <img
        src="/landingBg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-18 pointer-events-none z-1" />
      <div className="py-50 max-w-xl mx-auto min-h-screen">
        <div className={`flex flex-col items-center justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="px-15 py-10 gap-7 flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-3 w-full">
                <h1 className="text-4xl font-bold">Login to <span className="font-bold outlined-thin-text italic">Pursuit</span></h1>
                <p className="text-sm text-zinc-400 noto-font">Don't have an account? &nbsp;
                  <NavLink to="/signup" className="font-bold text-[#e8e6e3] hover:brightness-70 transition-brightness duration-200">
                    Sign up</NavLink>.
                </p>
              </div>
              <div className="flex flex-col gap-5 noto-font w-full text-[#7d7c7b]">
                <div className="flex flex-col gap-1 text-sm">
                  <label to="email">Email</label>
                  <input name="email"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex">
                    <label to="password" className="flex-1">Password</label>
                    <NavLink to="/forgot-password" className="font-bold noto-font text-[#e8e6e3] hover:brightness-70 transition-brightness duration-200">Forgot Password</NavLink>
                  </div>
                  <input name="password"
                    type="password"
                    placeholder="••••••••••••"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                  <div className="flex w-full mt-4 noto-font">
                    <button className={`welcome-buttons text-sm font-bold flex-1 border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] hover:bg-[#e8e6e3] hover:border-[#e8e6e3] hover:text-black
                  ${btnStyle ? "" : "brightness-50 pointer-events-none"}`}>Log In</button>
                  </div>
                </div>
                <div className="text-center text-sm mt-4">
                  <p>By signing in, you agree to our Terms and Privacy Policy.</p>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
    </>
  )
}

export default Login;
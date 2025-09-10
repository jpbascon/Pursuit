import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { registerUser } from "../api.js";
import { useAlert } from '../context/Alert.jsx';

const Signup = () => {
  const navigate = useNavigate();
  const [btnStyle, setBtnStyle] = useState(false);
  const { showAlert } = useAlert();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      showAlert(res.data.message);
    } catch (err) {
      showAlert(
        err.response?.data?.error ||
        err.message ||
        "Something went wrong"
      );
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) setBtnStyle(false);
    else setBtnStyle(true);
  }, [formData])
  return (
    <>
      <div className="py-40 max-w-xl mx-auto min-h-screen">
        <div className={`flex flex-col items-center justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <form className="w-full"
            onSubmit={handleSubmit}>
            <div className="px-15 py-10 gap-8 flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-4xl font-bold">Create a <span className="font-bold outlined-thin-text italic">Pursuit</span> Account</h1>
                <p className="text-sm text-zinc-400 noto-font">Already have an account? &nbsp;
                  <NavLink to="/login" className="font-bold text-[#e8e6e3] hover:brightness-70 transition-brightness duration-200">
                    Log In</NavLink>.</p>
              </div>
              <div className="flex flex-col gap-4 noto-font w-full text-[#7d7c7b]">
                <div className="flex flex-col gap-1 text-sm">
                  <label to="name">Name</label>
                  <input name="name"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label to="email">Email</label>
                  <input name="email"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label to="password" className="flex-1">Password</label>
                  <input name="password"
                    type="password"
                    placeholder="••••••••••••"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label to="passwordConfirm" className="flex-1">Confirm Password</label>
                  <input name="passwordConfirm"
                    type="password"
                    placeholder="••••••••••••"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange}
                  />
                  <div className="flex w-full mt-4 noto-font">
                    <button className={`welcome-buttons text-sm font-bold flex-1 border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] hover:bg-[#e8e6e3] hover:border-[#e8e6e3] hover:text-black
                  ${btnStyle ? "" : "brightness-50 pointer-events-none"}`}>Create Account</button>
                  </div>
                </div>
                <div className="text-center text-sm mt-4">
                  <p>By signing up, you agree to our Terms and Privacy Policy.</p>
                </div>
              </div>
            </div>
          </form>
        </div >
      </div >
    </>
  )
}

export default Signup;
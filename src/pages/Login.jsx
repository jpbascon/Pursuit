import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loginUser } from "../api.js";
import { useAlert } from '../context/Alert.jsx';

const Login = ({ setIsLoggedIn }) => {
  const { showAlert } = useAlert();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      if (!res.ok) return showAlert(res.data.error?.message?.response?.data);
      showAlert(res.data.message);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (err) {
      setIsLoggedIn(false);
      showAlert(err.response?.data?.error || "Something went wrong");
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  return (
    <>
      <div className="px-[10%] py-[10%] min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full">
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Welcome back</h1>
          </div>
          <form className="flex flex-col gap-[1rem] w-[50%]" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label to="email">
                Email
              </label>
              <input
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="email"
                onChange={handleChange}
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
                onChange={handleChange}
              />
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-eye" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"></path><circle cx="12" cy="12" r="3"></circle></svg> */}
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
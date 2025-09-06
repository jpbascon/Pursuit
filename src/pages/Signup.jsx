import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { registerUser } from "../api.js";
import { useAlert } from '../context/Alert.jsx';

const Signup = () => {
  const navigate = useNavigate();
  const { alert, alertMessage, showAlert } = useAlert();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      showAlert(res.data.message);
    } catch (err) {
      if (err.response) showAlert(err.response.data.error);
      else if (err.request) showAlert("No response from server. Please try again.");
      else showAlert("An unexpected error occurred.");
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
      <div className="px-[10%] py-[7%] flex flex-col min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full">
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Create your account</h1>
          </div>
          <form className="flex flex-col gap-[1rem] w-[50%]" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label to="name">
                Name
              </label>
              <input
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="name"
                onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label to="email">
                Email
              </label>
              <input
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="email"
                onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label to="password">
                Password
              </label>
              <input
                type="password"
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="password"
                onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <label to="passwordConfirm">
                Confirm Password
              </label>
              <input
                type="password"
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="passwordConfirm"
                onChange={handleChange} />
              <div className="text-end">Already have an account?&nbsp;
                <button
                  type="button"
                  className="underline italic"
                  onClick={() => { navigate('/login'); }}>
                  Log in
                </button>
              </div>
            </div>
            <div className="mt-[2rem] flex flex-col">
              <button type="submit" className="my-auto border-1 border-[#e8e6e3] text-lg px-[2rem] py-[1.3rem] rounded-xs hover:bg-[#e8e6e3] hover:text-black transition-all cursor-pointer">
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
import { useEffect, useState } from 'react';
import { resetPassword } from "../api.js";
import { useAlert } from '../context/Alert.jsx';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [btnStyle, setBtnStyle] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ password: "", passwordConfirm: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(formData.password, formData.passwordConfirm);
      showAlert(res.data.message);
      navigate("/login");
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
    if (!formData.password || !formData.passwordConfirm) return setBtnStyle(false);
    setBtnStyle(true);
  })
  return (
    <>
      <img
        src="/landingBg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-18 pointer-events-none z-1" />
      <div className="py-50 max-w-xl mx-auto min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <form className="w-full"
            onSubmit={handleSubmit}>
            <div className="px-15 py-10 gap-8 flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-4xl font-bold">Forgot Password</h1>
                <p className="text-zinc-400 text-sm noto-font">Change your password</p>
              </div>
              <div className="flex flex-col gap-4 noto-font w-full text-[#7d7c7b]">
                <div className="flex flex-col gap-1 text-sm">
                  <label to="password">Password</label>
                  <input name="password"
                    type="password"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none text-[#e8e6e3] noto-font focus:border-[#e8e6e3] transition-border duration-200"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label to="passwordConfirm">Confirm Password</label>
                  <input name="passwordConfirm"
                    type="password"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none text-[#e8e6e3] noto-font focus:border-[#e8e6e3] transition-border duration-200"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex w-full mt-4 noto-font">
                    <button className={`welcome-buttons text-sm font-bold flex-1 border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] hover:bg-[#e8e6e3] hover:border-[#e8e6e3] hover:text-black
                    ${btnStyle ? "brightness-100" : "brightness-50 pointer-events-none"}`}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;
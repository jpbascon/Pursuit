import { useEffect, useState } from 'react';
import { resetPassword } from "../api.js";
import { useAlert } from '../context/Alert.jsx';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
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
  return (
    <>
      <div className="px-[10%] py-[10%] min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full">
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Forgot Password</h1>
          </div>
          <form className="flex flex-col gap-[1rem] w-[50%]" onSubmit={handleSubmit}>
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
            </div>
            <div className="flex flex-col">
              <label to="passwordConfirm">
                Confirm Password
              </label>
              <input
                type="password"
                className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                name="passwordConfirm"
                onChange={handleChange}
              />
            </div>
            <div className="gap-1 mt-[2rem] flex flex-col">
              <button type="submit" className="my-auto border-1 border-[#e8e6e3] text-lg px-[2rem] py-[1.3rem] rounded-xs hover:bg-[#e8e6e3] hover:text-black transition-all cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;
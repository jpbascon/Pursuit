import { useEffect, useState, useRef } from 'react';
import { verifyOtp } from '../api';
import { useAlert } from '../context/Alert';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const navigate = useNavigate();
  const [btnStyle, setBtnStyle] = useState(false);
  const [visible, setVisible] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([])
  const { showAlert } = useAlert();
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const otpString = otp.join("");
      const res = await verifyOtp(otpString);
      showAlert(res.data.message);
      navigate("/reset-password");
    } catch (err) {
      showAlert(
        err.response?.data?.error ||
        err.message ||
        "Something went wrong"
      );
    }
  };
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // stop default text insertion

    const pasteData = e.clipboardData.getData("text").slice(0, otp.length);
    if (!/^[0-9]+$/.test(pasteData)) return; // only digits allowed

    const newOtp = pasteData.split("");
    while (newOtp.length < otp.length) {
      newOtp.push("");
    }
    setOtp(newOtp);

    // focus the last filled input
    const lastIndex = newOtp.findIndex((digit) => digit === "");
    inputsRef.current[lastIndex === -1 ? otp.length - 1 : lastIndex].focus();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    if (otp.join("").length < 6) return setBtnStyle(false);
    setBtnStyle(true);
  }, [otp]);
  return (
    <>
      <div className="py-50 max-w-lg mx-auto min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <form className="w-full"
            onSubmit={handleVerify}>
            <div className="px-15 py-10 gap-10 flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-4xl font-bold">OTP Verification</h1>
                <p className="text-zinc-400 text-sm noto-font">You're one step away from changing your password</p>
              </div>
              <div className="flex flex-col gap-4 noto-font w-full text-[#7d7c7b]">
                <div className="flex flex-col gap-1 text-sm">
                  <label to="otp">Your OTP</label>
                  <div className="flex justify-between">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-lg font-bold border-[2px] border-neutral-800 rounded-md focus:outline-none focus:border-[#e8e6e3] transition-border duration-200"
                      />
                    ))}
                  </div>
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


export default OTP;
import { useEffect, useState } from 'react';
import { contact } from '../api';
import { useAlert } from '../context/Alert';

const Contact = () => {
  const [btnStyle, setBtnStyle] = useState(false);
  const [visible, setVisible] = useState(false);
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await contact(formData);
      showAlert(res.data.message);
    } catch (err) {
      if (err.response && err.response.data?.error) {
        showAlert(err.response.data.error);
      } else {
        showAlert(
          err.response?.data?.error ||
          err.message ||
          "Something went wrong"
        );
      }
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    if (!formData.email || !formData.subject || !formData.message) setBtnStyle(false);
    else setBtnStyle(true);
  }, [formData])
  return (
    <>
      <div className="py-40 max-w-xl mx-auto min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <form className="w-full"
            onSubmit={handleSubmit}>
            <div className="px-15 py-10 gap-8 flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-4xl font-bold">Contact us</h1>
                <p className="text-sm text-zinc-400 noto-font">Have any questions? Send us a message.</p>
              </div>
              <div className="flex flex-col gap-4 noto-font w-full text-[#7d7c7b]">
                <div className="flex flex-col gap-1 text-sm">
                  <label to="email">Email</label>
                  <input name="email"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label to="subject">Subject</label>
                  <input name="subject"
                    className="border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <label to="message" className="flex-1">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="border-[2px] border-neutral-800 p-4 rounded-sm outline-none bg-[#121212] text-[#e8e6e3] noto-font resize-none"
                    onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex w-full mt-4 noto-font">
                    <button className={`welcome-buttons text-sm font-bold flex-1 border-[2px] border-neutral-800 h-12 px-4 rounded-sm outline-none bg-[#121212] hover:bg-[#e8e6e3] hover:border-[#e8e6e3] hover:text-black
                  ${btnStyle ? "" : "brightness-50 pointer-events-none"}`}>Submit</button>
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

export default Contact;
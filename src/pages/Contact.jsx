import { useEffect, useState } from 'react';
import { contact } from '../api';
import { useAlert } from '../context/Alert';

const Contact = () => {
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
  return (
    <>
      <div className="px-[10%] py-40 min-h-screen">
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full">
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Send us a message</h1>
          </div>
          <form className="flex justify-start w-[50%]">
            <div className="flex flex-col gap-3 w-full">
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
                <label to="subject">
                  Subject
                </label>
                <input
                  className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                  name="subject"
                  onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <label to="message">
                  Message
                </label>
                <textarea
                  className="border-1 border-[#e8e6e3] resize-none transition-all px-2 py-3 rounded-xs outline-none"
                  rows="3"
                  name="message"
                  onChange={handleChange} />
              </div>
              <div className="gap-1 mt-[2rem] flex flex-col">
                <button className="my-auto border-1 border-[#e8e6e3] text-lg px-[2rem] py-[1.3rem] rounded-xs hover:bg-[#e8e6e3] hover:text-black transition-all cursor-pointer"
                  type="submit"
                  onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact;
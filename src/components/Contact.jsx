import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Contact = () => {
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
      <div className="relative px-[10%] py-[10%] flex flex-col items-end min-h-screen">
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-35 pointer-events-none" />
        <div className={`gap-[5rem] flex flex-col items-start justify-center relative z-10 transition-opacity duration-500
          ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="w-full">
            <h1 className="text-start text-8xl font-bold bg-white outlined-text size-fit italic">Send us a message</h1>
          </div>
          <form className="flex flex-col items-end gap-[1rem] w-full">
            <div className="w-[90%]">
              <div className="flex flex-col">
                <label to="email">
                  Email
                </label>
                <input
                  className="border-1 border-white resize-none transition-all px-2 py-3 rounded-xs outline-none"
                  name="email" />
              </div>
              <div className="flex flex-col">
                <label to="Subject">
                  Subject
                </label>
                <input
                  type="Subject"
                  className="border-1 border-white resize-none transition-all px-2 py-3 rounded-xs outline-none"
                  name="Subject" />
              </div>
              <div className="flex flex-col">
                <label to="message">
                  Message
                </label>
                <textarea
                  type="message"
                  className="border-1 border-white resize-none transition-all px-2 py-3 rounded-xs outline-none"
                  name="message" />
              </div>
              <div className="gap-1 mt-[2rem] flex flex-col">
                <button className="my-auto border-1 border-white text-white text-lg px-[2rem] py-[1.3rem] rounded-xs hover:bg-white hover:text-black transition-all cursor-pointer">
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
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';

const About = () => {
  const [joinButton, setJoinButton] = useState(false);
  const [firstHeader, setFirstHeader] = useState(false);
  const [developer, setDeveloper] = useState(false);
  const [paragraph, setParagraph] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstHeader(true);
    }, 50)
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDeveloper(true);
    }, 250)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setParagraph(true);
    }, 500)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setJoinButton(true);
    }, 700)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setImage(true);
    }, 200)
    return () => clearTimeout(timeout);
  }, [])
  return (
    <>
      <img
        src="/landingBg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-18 pointer-events-none z-1" />
      <div className="py-40 min-h-screen relative">
        <div className="gap-10 flex items-center max-w-7xl mx-auto relative z-10">
          <div className="flex items-start w-full">
            <div className="gap-10 flex flex-col w-full size-fit">
              <div className="flex flex-col w-full items-start">
                <h1 className={`text-8xl font-bold font-heading transition duration-800 italic ${firstHeader ? "opacity-100 developer" : "opacity-0"}`}>Meet the<br></br><span className={`outlined-text transition duration-800 ${developer ? "opacity-100" : "opacity-0"}`}>developer</span></h1>
              </div>
              <p className={`text-xl/relaxed text-justify transition duration-800 roboto-font ${paragraph ? "opacity-100 developer" : "opacity-0"}`}>Hey, I'm Jason. A web developer based in Philippines. I enjoy creating meaningful projects such as <span className="italic">Pursuit.</span>
                &nbsp;From an early age, I discovered my passion for <strong>bringing imagination to life and shaping it into reality</strong>. Now that I’ve grown, Web Development has become my instrument through which I express my creativity and ambition.
              </p>
              <div className="flex w-full">
                <NavLink to="/login" className={`mt-[2rem] min-w-50 my-auto font-bold text-center text-md px-[2rem] py-[1.3rem] rounded-sm border-[2px] border-[#e8e6e3] hover:bg-[#e8e6e3] hover:text-[#111313] welcome-buttons
            ${joinButton ? "opacity-100 developer" : "opacity-0"}`}>Join Us</NavLink>
              </div>
            </div>
            {/*             <div className="flex w-[20%]">
              <span className="flex-1 border-t-[#e8e6e3] border-t-2"></span>
            </div> */}
          </div>
          <div className="flex justify-center w-full">
            <img
              src="/jasonb.png"
              alt="Jason's graduation picture"
              className={`w-[430px] h-[430px] bg-neutral-950 border-2 border-[#e8e6e3] p-10 object-cover brightness-85 pointer-events-none transition duration-800
                ${image ? "opacity-100 img" : "opacity-0"}`} />
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
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
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDeveloper(true);
    }, 250)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setImage(true);
    }, 350)
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
    }, 750)
    return () => clearTimeout(timeout);
  }, [])
  return (
    <>
      <div className="relative px-[10%] py-[10%] min-h-screen">
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-35 pointer-events-none" />
        <div className="relative flex max-w-7xl mx-auto z-10">
          <div className="gap-14 flex flex-col w-full">
            <h1 className={`text-8xl font-bold size-fit italic whitespace-pre-line transition duration-800 ${firstHeader ? "opacity-100 developer" : "opacity-0"}`}>Meet the <span className={`transition duration-800 ${developer ? "opacity-100" : "opacity-0"}`}>developer</span></h1>
            <p className={`text-xl text-justify transition duration-800 ${paragraph ? "opacity-100 developer" : "opacity-0"}`}>Hey, I'm Jason. A web developer based in Philippines. I enjoy creating meaningful projects such as <span className="italic">Pursuit.</span>
              I envision a day when my ambitions will reflect who I truly am — and I believe this project will prove that.</p>
            <div className="flex justify-start">
              <NavLink to="/signup" className={`min-w-50 my-auto text-white text-center text-lg px-[2rem] py-[1.3rem] rounded-xs border-2 border-white hover:bg-white hover:text-black
            ${joinButton ? "opacity-100 developer" : "opacity-0"}`}>Join Us</NavLink>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <img
              src="/jasonb.jpeg"
              className={`h-[500px] object-cover rounded-[50%] border-2 border-white p-10 brightness-90 pointer-events-none  transition duration-800 ${image ? "opacity-100 developer" : "opacity-0"}`} />
          </div>
        </div>
      </div>
    </>
  )
}

export default About;
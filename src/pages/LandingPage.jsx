import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { track } from "@vercel/analytics"

const LandingPage = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [showSecondHeader, setShowSecondHeader] = useState(false);
  const [showSecondParagraph, setShowSecondParagraph] = useState(false);
  const [showButton1, setShowButton1] = useState(false);
  const [showButton2, setShowButton2] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHeader(true);
    }, 50)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowParagraph(true);
    }, 250)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondHeader(true);
    }, 550)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondParagraph(true);
    }, 700)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton1(true);
    }, 650)
    return () => clearTimeout(timeout);
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowButton2(true);
    }, 750)
    return () => clearTimeout(timeout);
  }, [])

  return (
    <>
      <div className="px-[10%] py-[10%] min-h-screen">
        <div className="max-w-7xl mx-auto flex flex-col gap-35 items-start relative z-10">
          <div className="flex flex-col italic">
            <h1 className={`text-9xl font-bold transition duration-800 ${showHeader ? "opacity-100 landing-page" : "opacity-0"}`}>Chase your dreams
              <p className={`text-3xl font-normal transition duration-800 text-center md:max-w-[474px] ${showParagraph ? "opacity-100 with" : "opacity-0"}`}>with</p>
              <div className="flex items-end gap-10">
                <span className={`text-9xl font-bold size-fit bg-white transition duration-800 outlined-text ${showSecondHeader ? "opacity-100 pursuit" : "opacity-0"}`}>Pursuit.</span>
                <p className={`text-xl mb-2 font-normal transition duration-800 ${showSecondParagraph ? "opacity-100 with" : "opacity-0"}`}>where brave minds connect</p>
              </div>
            </h1>
          </div >
          <div className="flex justify-start gap-5">
            <NavLink to="/about" className={`flex-1 min-w-50 my-auto text-center text-lg px-[2rem] py-[1.3rem] rounded-xs whitespace-nowrap border-1 border-[#e8e6e3] hover:bg-[#e8e6e3] hover:text-[#111313]
            ${showButton1 ? "opacity-100 lp-buttons" : "opacity-0"}`}
              onClick={track('test_click')}>Learn more</NavLink>
            <NavLink to="/login" className={`flex-1 min-w-50 my-auto text-center text-lg px-[2rem] py-[1.3rem] rounded-xs border-1 border-[#e8e6e3] hover:bg-[#e8e6e3] hover:text-[#111313]
            ${showButton2 ? "opacity-100 lp-buttons" : "opacity-0"}`}
              onClick={track('test_click')}>Join Us</NavLink>
          </div>
        </div>
      </div >
    </>
  )
}

export default LandingPage;
import Navbar from './pages/Navbar';
import About from './pages/About';
import Footer from './pages/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import OTP from './pages/OTP';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import { Analytics } from "@vercel/analytics/react"
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAlert } from './context/Alert';

function App() {
  const { alert, alertMessage, hideAlert } = useAlert();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [])
  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-25 pointer-events-none" />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/dashboard"
              element={
                <ProtectedRoute setIsLoggedIn={setIsLoggedIn}>
                  <Dashboard setIsLoggedIn={setIsLoggedIn} />
                </ProtectedRoute>}>
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/otp" element={<OTP />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/verify-email" element={<EmailVerification />}></Route>
          </Routes>
          <Analytics />
          <div className="absolute bottom-[25%] right-0 z-100">
            <div className={`px-10 py-8 border-1 border-r-0 border-[#e8e6e3] border-b-[#e8e6e3] rounded-tl-sm rounded-bl-sm roboto-font transition-all relative
              ${alert ? "opacity-100" : "opacity-0"}`}>
              <p className="text-base">{alertMessage}</p>
              <button className="absolute top-2 right-2"
                onClick={() => hideAlert()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </main >
        <Footer />
      </div >
    </>
  )
}

export default App

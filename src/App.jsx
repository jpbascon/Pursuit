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
import Goals from './pages/Goals';
import ProtectedRoute from './components/ProtectedRoute';
import OTP from './pages/OTP';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import AppLayout from './context/AppLayout';
import { getProfile } from './api';
import { Analytics } from "@vercel/analytics/react"
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAlert } from './context/Alert';

function App() {
  const { alert, alertMessage, hideAlert } = useAlert();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [createGoal, setCreateGoal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-screen relative w-full">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} createGoal={createGoal} setCreateGoal={setCreateGoal} />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn === null
                  ? null
                  : isLoggedIn
                    ? <Navigate to="/dashboard" replace />
                    : <LandingPage />
              }
            />
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
              <Route
                element={
                  <AppLayout
                    setIsLoggedIn={setIsLoggedIn}
                    createGoal={createGoal}
                    setCreateGoal={setCreateGoal}
                  />}>
                <Route
                  path="/dashboard"
                  element={<Dashboard createGoal={createGoal} setCreateGoal={setCreateGoal} />}
                />
                <Route
                  path="/goals"
                  element={<Goals createGoal={createGoal} setCreateGoal={setCreateGoal} />}
                />
              </Route>
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/otp" element={<OTP />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/verify-email" element={<EmailVerification />}></Route>
          </Routes>
          <Analytics />
          <div className="top-[6%] left-1/2 -translate-x-1/2 content-center fixed z-10000">
            <div className={`py-2 px-4 border-[2px] border-[#e8e6e3] rounded-sm transition-all relative size-fit cursor-pointer hover:bg-[#e8e6e3] hover:text-black
                ${alert ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              onClick={() => hideAlert()}>
              <p className="text-sm font-bold noto-font">{alertMessage}</p>
            </div>
          </div>
        </div>
        <Footer isLoggedIn={isLoggedIn} />
      </div >
    </>
  )
}

export default App

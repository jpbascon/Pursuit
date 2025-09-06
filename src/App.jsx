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
import { Analytics } from "@vercel/analytics/react"
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") setIsLoggedIn(true);
  }, [])
  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <img
          src="/landingBg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-35 pointer-events-none" />
        <Navbar setAlert={setAlert} setAlertMessage={setAlertMessage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login setAlert={setAlert} setAlertMessage={setAlertMessage} setIsLoggedIn={setIsLoggedIn} />}></Route>
            <Route path="/signup" element={<Signup setAlert={setAlert} setAlertMessage={setAlertMessage} />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard setAlert={setAlert} setAlertMessage={setAlertMessage} setIsLoggedIn={setIsLoggedIn} />
                </ProtectedRoute>}>
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Routes>
          <Analytics />
          <div className={`py-8 px-10 border-1 border-r-0 border-[#e8e6e3] border-b-[#e8e6e3] rounded-tl-sm rounded-bl-sm absolute bottom-[25%] right-0 roboto-font transition-all z-100
            ${alert ? "opacity-100" : "opacity-0"}`}>
            <p className="text-base">{alertMessage}</p>
          </div>
        </main >
        <Footer />
      </div >
    </>
  )
}

export default App

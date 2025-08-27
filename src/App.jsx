import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import LandingPage from './components/LandingPage';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Routes>
        </main >
        <Footer />
      </div >
    </>
  )
}

export default App

import Navbar from './components/Navbar';
import About from './components/About';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login
            />}></Route>
            <Route path="/signup" element={<Signup
            />}></Route>
          </Routes>
        </main >
        <Footer />
      </div >
    </>
  )
}

export default App

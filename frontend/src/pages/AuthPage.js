import React, { useState, useEffect } from 'react'
import Header from '../components/Header.js'
import '../index.css'
import kebab1 from '../img/kebab1.jpg'
import kebab2 from '../img/kebab2.jpg'
import Login from '../components/Login.js'
import Register from '../components/Register.js'
import Footer from '../components/Footer.js'
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp)
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/map');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#D8D9CE]">
      <Header />
      <section className="flex justify-center items-start min-h-screen mt-16 overflow-hidden">
        <div className="relative w-[800px] h-[500px] grid grid-cols-2 grid-rows-2 transition-all duration-1000 ease-in-out transform-gpu">
          <div className={`absolute top-0 left-0 w-1/2 h-full ${isSignUp ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'} transition-all duration-1000`}>
            <img
              src={kebab1}
              alt="Kebab Sign In"
              className="size-full object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {!isSignUp && (
            <Login toggleForm={toggleForm} />
          )}
          
          {isSignUp && (
            <Register toggleForm={toggleForm} />
          )}
          
          <div className={`absolute bottom-0 right-0 w-1/2 h-full ${isSignUp ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none scale-90'} transition-all duration-1000`}>
            <img
              src={kebab2}
              alt="Kebab Sign Up"
              className="size-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

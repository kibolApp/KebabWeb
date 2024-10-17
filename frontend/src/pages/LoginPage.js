import React, { useState } from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Login from '../components/Login.js';
import Register from '../components/Register.js';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = (event) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <Header />
      <section className="flex justify-center items-center py-8 bg-gray-100 min-h-screen">
        <div
          className="container flex justify-center items-center transition-all duration-500 ease-in-out transform"
          style={{ marginTop: '-100px' }}
        >
          {isSignUp ? <Register toggleForm={toggleForm} /> : <Login toggleForm={toggleForm} />}
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import '../index.css';
import Header from '../components/Header.js';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = (event) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  };

  const loginForm = (
    <form className={`w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md transition-opacity duration-500 ease-in-out ${isSignUp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}> 
      <h3 className="text-2xl font-bold text-center mb-6">Logowanie</h3>
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="email"
        placeholder="E-mail"
        required
      />
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="password"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Zaloguj się
      </button>
      <p className="text-center mt-4">
        Nie posiadasz konta?{' '}
        <a href="#" onClick={toggleForm} className="text-blue-500 underline">
          Zarejestruj się.
        </a>
      </p>
    </form>
  );

  const registerForm = (
    <form className={`w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md transition-opacity duration-500 ease-in-out ${isSignUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> 
      <h3 className="text-2xl font-bold text-center mb-6">Rejestracja</h3>
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="text"
        placeholder="Username"
        required
      />
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="email"
        placeholder="E-mail Address"
        required
      />
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="password"
        placeholder="Create Password"
        required
      />
      <button
        type="submit"
        className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Zarejestruj się
      </button>
      <p className="text-center mt-4">
        Posiadasz już konto?{' '}
        <a href="#" onClick={toggleForm} className="text-blue-500 underline">
          Zaloguj się.
        </a>
      </p>
    </form>
  );

  return (
    <div>
      <Header />
      <section className="flex justify-center items-center py-8 bg-gray-100 min-h-screen">
        <div className="container flex justify-center items-center transition-all duration-500 ease-in-out transform"
             style={{ marginTop: '-100px' }}>
          {isSignUp ? registerForm : loginForm}
        </div>
      </section>
    </div>
  );
}

import '../index.css';
import React, { useState } from 'react';
import axiosClient from '../axiosClient.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);
        toast.success('Logowanie zakończone sukcesem!' , { autoClose: 2000 });
        setTimeout(() => navigate('/map'), 2000);
      }
    } catch (error) {
      toast.error('Błąd logowania. Sprawdź swoje dane.' , { autoClose: 2000 });
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="absolute top-0 right-0 w-1/2 h-full bg-white p-8 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out delay-300">
      <h3 className="text-2xl font-bold text-center mb-6">Logowanie</h3>
      <form onSubmit={handleLogin}>
        <input
          className="w-full p-4 mb-4 text-gray-700 border rounded-md"
          type="email"
          placeholder="Adres E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-4 mb-4 text-gray-700 border rounded-md"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-4 bg-[#283618] text-white rounded-md hover:bg-[#606C38] transition">
          Zaloguj się
        </button>
      </form>
      <p className="text-center mt-4">
        Nie posiadasz konta?{' '}
        <a href="#" onClick={toggleForm} className="text-[#283618] underline">
          Zarejestruj się.
        </a>
      </p>
      <ToastContainer />
    </div>
  );
}

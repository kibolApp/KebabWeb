import React, { useState } from 'react'
import '../index.css'
import axiosClient from '../axiosClient.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../ContextProvider.js'
import PropTypes from 'prop-types';

export default function Login({ toggleForm }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAppContext()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosClient.post('/login', {
        email,
        password,
      })
      if (response.status === 200) {
        toast.success('Logowanie zakończone sukcesem!', { autoClose: 2000 })
        login(response.data.token)
        setTimeout(() => navigate('/map'), 2000)
      }
    } catch (error) {
      toast.error('Błąd logowania. Sprawdź swoje dane.', { autoClose: 2000 })
      console.error('Error logging in:', error)
    }
  }

  return (
    <div className="absolute bottom-0 right-0 size-full md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out delay-300">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Logowanie</h3>
      <form onSubmit={handleLogin}>
        <input
          className="w-full p-2 md:p-4 mb-3 md:mb-4 text-gray-700 border rounded-md text-sm md:text-base"
          type="email"
          placeholder="Adres E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 md:p-4 mb-3 md:mb-4 text-gray-700 border rounded-md text-sm md:text-base"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-3 md:p-4 bg-darkGreen text-white rounded-md hover:bg-oliveGreen transition text-sm md:text-base">
          Zaloguj się
        </button>
      </form>
      <p className="text-center mt-3 md:mt-4 text-sm md:text-base">
        Nie masz jeszcze konta?{' '}
        <a href="#" onClick={toggleForm} className="text-darkGreen underline">
          Zarejestruj się.
        </a>
      </p>
      <ToastContainer />
    </div>
  )
}

Login.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

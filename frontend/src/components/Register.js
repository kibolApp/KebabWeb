import React, { useState } from 'react'
import '../index.css'
import axiosClient from '../axiosClient.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../ContextProvider.js'
import PropTypes from 'prop-types';

export default function Register({ toggleForm }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const navigate = useNavigate()
  const { login } = useAppContext()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      toast.error('Hasła nie są zgodne.')
      return
    }
    try {
      const response = await axiosClient.post('/register', {
        name: username,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      if (response.status === 200) {
        toast.success('Rejestracja zakończona sukcesem!', { autoClose: 2000 })
        login(response.data.token)
        setTimeout(() => navigate('/map'), 2000)
      }
    } catch (error) {
      console.error('Error registering:', error.response ? error.response : error)
      if (error.response && error.response.data && error.response.data.errors) {
        toast.error(`Błąd serwera: ${error.response.data.message}`, { autoClose: 2000 })
      } else {
        toast.error('Błąd podczas rejestracji.', { autoClose: 2000 })
      }
    }
  }

  return (
    <div className="absolute bottom-0 left-0 size-full md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out delay-300">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Rejestracja</h3>
      <form onSubmit={handleRegister}>
        <input
          className="w-full p-2 md:p-4 mb-3 md:mb-4 text-gray-700 border rounded-md text-sm md:text-base"
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input
          className="w-full p-2 md:p-4 mb-3 md:mb-4 text-gray-700 border rounded-md text-sm md:text-base"
          type="password"
          placeholder="Potwierdź hasło"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-3 md:p-4 bg-darkGreen text-white rounded-md hover:bg-oliveGreen transition text-sm md:text-base">
          Zarejestruj się
        </button>
      </form>
      <p className="text-center mt-3 md:mt-4 text-sm md:text-base">
        Posiadasz już konto?{' '}
        <a href="#" onClick={toggleForm} className="text-darkGreen underline">
          Zaloguj się.
        </a>
      </p>
      <ToastContainer />
    </div>
  )
}

Register.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

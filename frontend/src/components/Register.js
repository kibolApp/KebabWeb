import React, { useState } from 'react'
import '../index.css'
import axiosClient from '../axiosClient.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

export default function Register({ toggleForm }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const navigate = useNavigate()

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
        toast.success('Rejestracja zakończona sukcesem!' , { autoClose: 2000 })
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
    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-white p-8 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out delay-300">
      <h3 className="text-2xl font-bold text-center mb-6">Rejestracja</h3>
      <form onSubmit={handleRegister}>
        <input
          className="w-full p-4 mb-4 text-gray-700 border rounded-md"
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <input
          className="w-full p-4 mb-4 text-gray-700 border rounded-md"
          type="password"
          placeholder="Potwierdź hasło"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit" className="w-full p-4 bg-[#283618] text-white rounded-md hover:bg-[#606C38] transition">
          Zarejestruj się
        </button>
      </form>
      <p className="text-center mt-4">
        Posiadasz już konto?{' '}
        <a href="#" onClick={toggleForm} className="text-[#283618] underline">
          Zaloguj się.
        </a>
      </p>
      <ToastContainer />
    </div>
  )
}

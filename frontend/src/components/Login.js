import React from 'react'

export default function Login({ toggleForm }) {
  return (
    <form className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md transition-opacity duration-500 ease-in-out opacity-100">
      <h3 className="text-2xl font-bold text-center mb-6">Logowanie</h3>
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="email"
        placeholder="Adres E-mail"
        required
      />
      <input
        className="w-full p-4 mb-4 text-gray-700 border rounded-md"
        type="password"
        placeholder="Hasło"
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
  )
}

import React from 'react'

export default function Register({ toggleForm }) {
  return (
    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-white p-8 rounded-lg shadow-md transition-opacity duration-1000 ease-in-out delay-300">
      <h3 className="text-2xl font-bold text-center mb-6">Rejestracja</h3>
      <input className="w-full p-4 mb-4 text-gray-700 border rounded-md" type="text" placeholder="Nazwa użytkownika" required />
      <input className="w-full p-4 mb-4 text-gray-700 border rounded-md" type="email" placeholder="Adres E-mail" required />
      <input className="w-full p-4 mb-4 text-gray-700 border rounded-md" type="password" placeholder="Hasło" required />
      <button className="w-full p-4 bg-[#283618] text-white rounded-md hover:bg-[#606C38] transition">
        Zarejestruj się
      </button>
      <p className="text-center mt-4">
        Posiadasz już konto?{' '}
        <a href="#" onClick={toggleForm} className="text-[#283618] underline">
          Zaloguj się.
        </a>
      </p>
    </div>
  )
}

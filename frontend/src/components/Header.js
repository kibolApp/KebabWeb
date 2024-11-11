import React, { useState, useEffect } from 'react'
import '../index.css'
import kebab_logo from '../img/kebab_logo.png'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const [buttonText, setButtonText] = useState('Powrót do strony głównej')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setButtonText('Powrót')
      } else {
        setButtonText('Powrót do strony głównej')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className="bg-[#283618] h-20 md:h-24 flex items-center justify-between px-4 relative">
      <button
        className="bg-[#606C38] text-white py-1 px-3 md:py-2 md:px-4 rounded text-sm md:text-base hover:bg-[#BC6C25] focus:outline-none focus:ring-2 focus:ring-[#DDA15E]"
        onClick={() => navigate('/')}
      >
        {buttonText}
      </button>
      <h1 className="text-xl md:text-3xl font-bold text-center text-white absolute left-1/2 -translate-x-1/2">
        Legnica Kebab City Tour
      </h1>
      <div className="h-full flex items-center">
        <img src={kebab_logo} alt="Legnica Kebab Logo" className="h-16 md:h-20" />
      </div>
    </header>
  )
}

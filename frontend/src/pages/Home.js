import '../index.css'
import kebab_logo from '../img/kebab_logo.png'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.js'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'

export default function Home() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    toast.success('Wylogowano pomyślnie!', { autoClose: 2000 })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="h-36"></header>
      <div className="flex items-center justify-center grow px-4 md:px-12">
        <div className="bg-gradient-to-b from-[#DDA15E] to-white-100 p-8 md:p-16 lg:p-32 rounded-lg shadow-2xl w-full max-w-7xl relative mb-16">
          <div className="flex justify-center mb-12">
            <img src={kebab_logo} alt="Legnica Kebab Logo" className="h-32 md:h-48 lg:h-72 absolute -top-16 md:-top-24 lg:-top-32" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-center text-[#283618] mb-6 md:mb-8 lg:mb-10">
            LEGNICA KEBAB CITY TOUR
          </h1>
          <p className="text-[#283618] text-center mb-10 md:mb-12 lg:mb-16 text-base md:text-lg lg:text-xl">
            Legnica Kebab City Tour jest to aplikacja oraz witryna internetowa służąca pomocą w odnalezieniu lokalizacji wszystkich dostępnych, w planach oraz zamkniętych punktów gastronomicznych serwujących słynne Kebaby. Poniższe przyciski pokierują Cię dalej. Wybierz przycisk "Mapa" aby bezpośrednio odnaleźć Kebaby rozsiane po Legnicy. Możesz też utworzyć konto lub zalogować się aby dodać Twojego ulubionego Kebaba do zakładki "Ulubione", dzięki czemu łatwiej go odnajdziesz!!
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
            <button 
              className="bg-[#606C38] text-white py-4 md:py-6 px-8 md:w-40 rounded-lg hover:bg-[#283618] focus:outline-none focus:ring-2 focus:ring-[#283618] text-lg md:text-xl"
              onClick={() => navigate('/map')}
            >
              MAPA
            </button>
            {isLoggedIn ? (
              <button 
                className="bg-[#606C38] text-white py-4 md:py-6 px-8 md:px-12 rounded-lg hover:bg-[#283618] focus:outline-none focus:ring-2 focus:ring-[#283618] text-lg md:text-xl"
                onClick={handleLogout}
              >
                WYLOGUJ
              </button>
            ) : (
              <button 
                className="bg-[#606C38] text-white py-4 md:py-6 px-8 md:px-12 rounded-lg hover:bg-[#283618] focus:outline-none focus:ring-2 focus:ring-[#283618] text-lg md:text-xl"
                onClick={() => navigate('/auth')}
              >
                LOGOWANIE
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

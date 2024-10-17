import '../index.css'
import kebab_logo from '../img/kebab_logo.png'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="bg-[#283618] h-24 flex items-center justify-between px-4 relative">
      <button
        className="bg-[#606C38] text-white py-2 px-4 rounded hover:bg-[#BC6C25] focus:outline-none focus:ring-2 focus:ring-[#DDA15E]"
        onClick={() => navigate('/')}
      >
        Powrót do strony głównej
      </button>
      <h1 className="text-3xl font-bold text-center text-white absolute left-1/2 -translate-x-1/2">
        Legnica Kebab City Tour
      </h1>
      <div className="h-full flex items-center">
        <img src={kebab_logo} alt="Legnica Kebab Logo" className="h-20" />
      </div>
    </header>
  )
}

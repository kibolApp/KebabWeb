import './index.css';
import kebab_logo from './img/kebab_logo.png';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-yellow-600 h-24 flex items-center justify-center relative">
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => navigate('/')}
      >
        Powrót do głównej strony
      </button>
      <div className="absolute bottom-[-3rem]">
        <img src={kebab_logo} alt="Legnica Kebab Logo" className="h-36" />
      </div>
    </header>
  );
}
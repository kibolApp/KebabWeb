import '../index.css';
import kebab_logo from '../img/kebab_logo.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.js';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import axiosClient from '../axiosClient.js';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);

      axiosClient
        .get('/getCurrentUser', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const user = response.data.user;
          setIsAdmin(user.isAdmin === 1);
        })
        .catch((error) => {
          console.error('Błąd pobierania danych użytkownika:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success('Wylogowano pomyślnie!', { autoClose: 2000 });
  };

  const handleSuggestionSubmit = async () => {
    const token = localStorage.getItem('authToken');
    if (!suggestion.trim()) {
      toast.error('Proszę wpisać treść sugestii.');
      return;
    }

    try {
      const userResponse = await axiosClient.get('/getCurrentUser', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data.user?.name || 'Anonimowy użytkownik';

      await axiosClient.post(
        '/suggestions',
        { user, contents: suggestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Sugestia została wysłana!');
      setIsModalOpen(false);
      setSuggestion('');
    } catch (error) {
      toast.error('Nie udało się wysłać sugestii. Spróbuj ponownie później.');
      console.error('Błąd podczas wysyłania sugestii:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-lightGrayish" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="h-36"></header>
      <div className="flex items-center justify-center grow px-4 md:px-12">
        <div className="bg-gradient-to-b from-gold to-white p-8 md:p-16 lg:p-32 rounded-lg shadow-2xl w-full max-w-7xl relative mb-16">
          <div className="flex justify-center mb-12">
            <img src={kebab_logo} alt="Legnica Kebab Logo" className="h-32 md:h-48 lg:h-72 absolute -top-16 md:-top-24 lg:-top-32" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold text-center text-darkGreen mb-6 md:mb-8 lg:mb-10">
            LEGNICA KEBAB CITY TOUR
          </h1>
          <p className="text-darkGreen text-center mb-10 md:mb-12 lg:mb-16 text-base sm:text-xs md:text-lg lg:text-xl">
            Legnica Kebab City Tour jest to aplikacja oraz witryna internetowa służąca pomocą w odnalezieniu lokalizacji wszystkich dostępnych, w planach oraz zamkniętych punktów gastronomicznych serwujących słynne Kebaby.  Poniższe przyciski pokierują Cię dalej. Wybierz przycisk "Mapa" aby bezpośrednio odnaleźć Kebaby rozsiane po Legnicy. Możesz też utworzyć konto lub zalogować się aby na mapie dodać Twojego ulubionego Kebaba, dzięki czemu łatwiej go odnajdziesz!! Dodatkowo po zalogowaniu pojawi się przycisk "Sugestia", nie krępuj się i zostaw nam swoją opinię!          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
            <button 
              className="bg-oliveGreen text-white py-4 md:py-6 px-8 md:w-40 rounded-lg hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-darkGreen text-lg md:text-xl"
              onClick={() => navigate('/map')}
            >
              MAPA
            </button>
            {isLoggedIn ? (
              <>
                <button 
                  className="bg-oliveGreen text-white py-4 md:py-6 px-8 md:px-12 rounded-lg hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-darkGreen text-lg md:text-xl"
                  onClick={handleLogout}
                >
                  WYLOGUJ
                </button>
                <button 
                  className="bg-gold text-darkGreen py-4 md:py-6 px-8 md:px-12 rounded-lg hover:bg-darkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-darkGreen text-lg md:text-xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  SUGESTIA
                </button>
                {isAdmin && (
                  <button 
                    className="bg-oliveGreen text-white py-4 md:py-6 px-8 md:px-12 rounded-lg hover:bg-darkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-darkGreen text-lg md:text-xl"
                    onClick={() => navigate('/admin')}
                  >
                    ADMIN PANEL
                  </button>
                )}
              </>
            ) : (
              <button 
                className="bg-oliveGreen text-white py-4 md:py-6 px-8 md:px-12 rounded-lg hover:bg-darkGreen focus:outline-none focus:ring-2 focus:ring-darkGreen text-lg md:text-xl"
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

      {/* Sugestia Panel */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-lg font-bold mb-4 text-center">Dodaj swoją sugestię</h2>
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              rows="4"
              placeholder="Wpisz swoją sugestię..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Anuluj
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={handleSuggestionSubmit}
              >
                Wyślij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

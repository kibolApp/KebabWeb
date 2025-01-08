import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import axiosClient from '../axiosClient.js';

const daysTranslations = {
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
};

const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const translateStatus = (status) => {
    const statusMap = {
      exists: 'Istnieje',
      closed: 'Zamknięty',
      planned: 'Planowany',
    };
    return statusMap[status] || 'Nieznany';
  };

  export default function KebabsList({ kebabs, activeKebabIndex }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [sortedKebabs, setSortedKebabs] = useState([]);
    const [userId, setUserId] = useState(null);
    const kebabRefs = useRef([]);
  
    useEffect(() => {
      if (activeKebabIndex !== null) {
        setOpenIndex(activeKebabIndex);
        if (kebabRefs.current[activeKebabIndex]) {
          kebabRefs.current[activeKebabIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }
    }, [activeKebabIndex]);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axiosClient.get('/getCurrentUser', {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
          });
          const user = response.data.user;
          setUserId(user.id);
          setFavorites(user.favorites ? JSON.parse(user.favorites) : []);
        } catch (error) {
          console.error('Błąd pobierania danych użytkownika:', error);
        }
      };
  
      fetchUser();
    }, []);

    useEffect(() => {
      const sortKebabs = () => {
        const favoriteKebabs = kebabs.filter((kebab) => favorites.includes(kebab.id));
        const nonFavoriteKebabs = kebabs.filter((kebab) => !favorites.includes(kebab.id));
        setSortedKebabs([...favoriteKebabs, ...nonFavoriteKebabs]);
      };
  
      sortKebabs();
    }, [favorites, kebabs]);
  
    const toggleDetails = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const handleFavoriteToggle = async (kebabId) => {
      try {
        if (favorites.includes(kebabId)) {
          await axiosClient.post(
            '/remfav',
            { user_id: userId, kebab_id: kebabId },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            }
          );
          setFavorites((prev) => prev.filter((id) => id !== kebabId));
        } else {
          await axiosClient.post(
            '/addfav',
            { user_id: userId, kebab_id: kebabId },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            }
          );
          setFavorites((prev) => [...prev, kebabId]);
        }
      } catch (error) {
        console.error('Błąd przy przełączaniu ulubionych:', error);
      }
    };
  
    return (
      <div className="w-full grid grid-cols-1 gap-4 p-2">
          {sortedKebabs.map((kebab, index) => (
            <div
              key={kebab.id}
              ref={(el) => (kebabRefs.current[index] = el)}
              className={`p-4 rounded-lg shadow-md bg-white ${
                activeKebabIndex === index ? 'border-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={favorites.includes(kebab.id) ? solidHeart : regularHeart}
                    className={`text-lg cursor-pointer mr-4 ${
                      favorites.includes(kebab.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                    onClick={() => handleFavoriteToggle(kebab.id)}
                  />
                  <div className="w-16 h-16 flex-shrink-0 mr-4">
                    <img
                      src={kebab.logo}
                      alt={kebab.name}
                      className="w-full h-full object-cover rounded-full border"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{kebab.name}</h3>
                    <p className="text-sm text-gray-600">{kebab.address}</p>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={faArrowDown}
                  className={`text-gray-600 text-lg transform transition-transform duration-500 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  onClick={() => toggleDetails(index)}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-screen' : 'max-h-0'
                }`}
              >
              <div className="p-3 border-t border-gray-200">
                <p className="text-gray-700 font-bold">Godziny otwarcia:</p>
                {dayOrder
                .filter((day) => kebab.opening_hours[day])
                .map((day) => (
                    <p key={day} className="text-gray-700">
                    <strong>{daysTranslations[day]}:</strong> {kebab.opening_hours[day]}
                    </p>
                ))}

                {kebab.meats && kebab.meats.length > 0 && (
                <div className="mt-2">
                    <p className="text-gray-700 font-bold">Mięsa:</p>
                    <p className="text-gray-700">{kebab.meats.join(', ')}</p>
                </div>
                )}

                {kebab.sauces && kebab.sauces.length > 0 && (
                <div className="mt-2">
                    <p className="text-gray-700 font-bold">Sosy:</p>
                    <p className="text-gray-700">{kebab.sauces.join(', ')}</p>
                </div>
                )}

                {kebab.status && (
                <div className="mt-2">
                    <p className="text-gray-700 font-bold">Status:</p>
                    <p className="text-gray-700">{translateStatus(kebab.status)}</p>
                </div>
                )}

                <div className="mt-2">
                  <p className="text-gray-700">
                    <span className="font-bold">Rzemieślniczy:</span> {kebab.is_crafted ? 'Tak' : 'Nie'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Na miejscu:</span> {kebab.is_premises ? 'Tak' : 'Nie'}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Sieciówka:</span> {kebab.is_chainstore ? 'Tak' : 'Nie'}
                  </p>
                </div>

                {kebab.ordering_options && kebab.ordering_options.length > 0 && (
                  <div className="mt-4">
                    <p className="text-lg font-bold text-gray-700">Opcje zamówień:</p>
                    <div className="mt-2">
                      {kebab.ordering_options.map((option, index) => (
                        <p key={index} className="text-base text-gray-800">
                          {option}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

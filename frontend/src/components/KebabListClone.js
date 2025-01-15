import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

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

export default function KebabsListClone({ kebabs, activeKebabIndex }) {
    const [openIndex, setOpenIndex] = useState(null);
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
    
      const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };

  return (
    <div className="w-full grid grid-cols-1 gap-4 p-2">
      {kebabs.map((kebab, index) => (
        <div
          key={kebab.id}
          id={`kebab-${index}`}
          ref={(el) => (kebabRefs.current[index] = el)}
          className={`p-4 rounded-lg shadow-md bg-white ${
            activeKebabIndex === index ? 'border-2 border-blue-500' : ''
          }`}
        >
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
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
                className={`text-gray-600 text-lg transform transition-transform duration-500 hover: cursor-pointer ${
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
                .filter((day) => kebab.opening_hours?.[day])
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

              {kebab.pages && Object.keys(kebab.pages).length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-700 font-bold">Strony:</p>
                  <div className="text-gray-700">
                    {Object.entries(kebab.pages).map(([key, value]) => (
                      <div key={key}>
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold capitalize text-blue-500 hover:text-blue-700 cursor-pointer"
                        >
                          {key}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {kebab.comments && kebab.comments.length > 0 && (
                <div className="mt-4">
                  <p className="text-gray-700 font-bold">Komentarze:</p>
                  <div className="text-gray-700 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    {kebab.comments.map((commentObj, index) => (
                      <div key={index} className="mb-2">
                        <span className="font-semibold">
                          {commentObj.name || `Użytkownik #${commentObj.id_user}`}:
                        </span>
                        <span> {commentObj.comment}</span>
                      </div>
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

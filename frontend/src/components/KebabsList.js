import React, { useState, useEffect } from 'react';
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

  export default function KebabsList({ kebabs, activeKebabIndex }) {
    const [openIndex, setOpenIndex] = useState(null);
  
    useEffect(() => {
      if (activeKebabIndex !== null) {
        setOpenIndex(activeKebabIndex);
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
            className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleDetails(index)}
            >
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
                className={`text-gray-600 text-lg transform transition-transform duration-500 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
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
                    <p className="text-lg font-bold text-gray-700">Opcje dostawy:</p>
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

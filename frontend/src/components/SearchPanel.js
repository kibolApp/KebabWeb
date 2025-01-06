import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function SearchPanel({ kebabs, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showOpenNow, setShowOpenNow] = useState(false);

  const getCurrentTimeDetails = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + currentMinute / 60; // Godzina w formacie dziesiętnym
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    return { currentTime, currentDay };
  };

  const isOpenNow = (kebab) => {
    const { currentTime, currentDay } = getCurrentTimeDetails();

    if (!kebab.opening_hours || !kebab.opening_hours[currentDay]) {
      return false; // Brak danych dla bieżącego dnia
    }

    const [opening, closing] = kebab.opening_hours[currentDay]
      .split('-')
      .map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour + minute / 60; // Zamiana na format dziesiętny
      });

    return currentTime >= opening && currentTime < closing;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let filteredKebabs = query
      ? kebabs.filter((kebab) =>
          kebab.name.toLowerCase().includes(query.toLowerCase())
        )
      : kebabs;

    if (showOpenNow) {
      filteredKebabs = filteredKebabs.filter(isOpenNow);
    }

    filteredKebabs = sortKebabs(filteredKebabs, sortOrder);

    onSearch(filteredKebabs);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);

    let filteredKebabs = sortKebabs(kebabs, order);

    if (searchQuery) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        kebab.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showOpenNow) {
      filteredKebabs = filteredKebabs.filter(isOpenNow);
    }

    onSearch(filteredKebabs);
  };

  const sortKebabs = (kebabs, order) => {
    return [...kebabs].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const toggleOpenNow = () => {
    setShowOpenNow(!showOpenNow);

    let filteredKebabs = kebabs;

    if (searchQuery) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        kebab.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (!showOpenNow) {
      filteredKebabs = filteredKebabs.filter(isOpenNow);
    }

    filteredKebabs = sortKebabs(filteredKebabs, sortOrder);

    onSearch(filteredKebabs);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <input
        type="text"
        placeholder="Szukaj kebaba..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <div className="mb-2 text-gray-700 font-medium">Sortowanie po nazwie:</div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => handleSortChange('asc')}
          className={`flex-1 p-2 text-center rounded ${
            sortOrder === 'asc'
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Rosnąco ↑
        </button>
        <button
          onClick={() => handleSortChange('desc')}
          className={`flex-1 p-2 text-center rounded ${
            sortOrder === 'desc'
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-700'
          }`}
        >
          Malejąco ↓
        </button>
      </div>

      {/* Filtrowanie */}
      <div
        className="text-gray-700 font-medium flex items-center justify-between cursor-pointer"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span>Filtrowanie</span>
        <FontAwesomeIcon
          icon={faArrowDown}
          className={`text-gray-600 text-lg transform transition-transform duration-500 ${
            isFilterOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isFilterOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showOpenNow}
              onChange={toggleOpenNow}
              className="w-4 h-4"
            />
            <span>Aktualnie otwarte</span>
          </label>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function SearchPanel({ kebabs, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showOpenNow, setShowOpenNow] = useState(false);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedMeats, setSelectedMeats] = useState([]);
  const [selectedOrderingOptions, setSelectedOrderingOptions] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);


  const allSauces = Array.from(
    new Set(kebabs.flatMap((kebab) => kebab.sauces || []))
  );

  const allMeats = Array.from(
    new Set(kebabs.flatMap((kebab) => kebab.meats || []))
  );

  const allOrderingOptions = Array.from(
    new Set(kebabs.flatMap((kebab) => kebab.ordering_options || []))
  );

  const allPages = Array.from(
    new Set(kebabs.flatMap((kebab) => Object.keys(kebab.pages || {})))
  );  

  const getCurrentTimeDetails = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour + currentMinute / 60;
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    return { currentTime, currentDay };
  };

  const isOpenNow = (kebab) => {
    const { currentTime, currentDay } = getCurrentTimeDetails();

    if (!kebab.opening_hours || !kebab.opening_hours[currentDay]) {
      return false;
    }

    const [opening, closing] = kebab.opening_hours[currentDay]
      .split('-')
      .map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour + minute / 60;
      });

    return currentTime >= opening && currentTime < closing;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    applyFilters(query, selectedSauces, selectedMeats, showOpenNow, sortOrder);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    applyFilters(searchQuery, selectedSauces, selectedMeats, showOpenNow, order);
  };

  const handleSauceToggle = (sauce) => {
    const updatedSauces = selectedSauces.includes(sauce)
      ? selectedSauces.filter((s) => s !== sauce)
      : [...selectedSauces, sauce];

    setSelectedSauces(updatedSauces);
    applyFilters(searchQuery, updatedSauces, selectedMeats, showOpenNow, sortOrder);
  };

  const handleMeatToggle = (meat) => {
    const updatedMeats = selectedMeats.includes(meat)
      ? selectedMeats.filter((m) => m !== meat)
      : [...selectedMeats, meat];

    setSelectedMeats(updatedMeats);
    applyFilters(searchQuery, selectedSauces, updatedMeats, showOpenNow, sortOrder);
  };

  const handleOrderingOptionToggle = (option) => {
    const updatedOptions = selectedOrderingOptions.includes(option)
      ? selectedOrderingOptions.filter((o) => o !== option)
      : [...selectedOrderingOptions, option];

      setSelectedOrderingOptions(updatedOptions);
      applyFilters(searchQuery, selectedSauces, selectedMeats, showOpenNow, sortOrder, updatedOptions);
  };

  const handlePageToggle = (page) => {
    const updatedPages = selectedPages.includes(page)
      ? selectedPages.filter((p) => p !== page)
      : [...selectedPages, page];
  
    setSelectedPages(updatedPages);
    applyFilters(searchQuery, selectedSauces, selectedMeats, showOpenNow, sortOrder, selectedOrderingOptions, updatedPages);
  };

  const toggleOpenNow = () => {
    const updatedShowOpenNow = !showOpenNow;
    setShowOpenNow(updatedShowOpenNow);
    applyFilters(searchQuery, selectedSauces, selectedMeats, updatedShowOpenNow, sortOrder);
  };

  const applyFilters = (query, sauces, meats, openNow, order, orderingOptions = [], pages = []) => {
    let filteredKebabs = kebabs;
  
    if (query) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        kebab.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    if (sauces.length > 0) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        sauces.every((sauce) => kebab.sauces?.includes(sauce))
      );
    }
  
    if (meats.length > 0) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        meats.every((meat) => kebab.meats?.includes(meat))
      );
    }
  
    if (orderingOptions.length > 0) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        orderingOptions.every((option) => kebab.ordering_options?.includes(option))
      );
    }
  
    if (pages.length > 0) {
      filteredKebabs = filteredKebabs.filter((kebab) =>
        pages.every((page) => Object.keys(kebab.pages || {}).includes(page))
      );
    }
  
    if (openNow) {
      filteredKebabs = filteredKebabs.filter(isOpenNow);
    }
  
    filteredKebabs = filteredKebabs.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });
  
    onSearch(filteredKebabs);
  };

  const kebabStatusCounts = () => {
    const statuses = { exists: 0, closed: 0, planned: 0 };
    kebabs.forEach((kebab) => {
      if (statuses[kebab.status] !== undefined) {
        statuses[kebab.status]++;
      }
    });
    return statuses;
  };
  
  const { exists, closed, planned } = kebabStatusCounts();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <input
        type="text"
        placeholder="Szukaj kebaba..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 border rounded-lg mb-2"
      />
      <div className="mb-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
        <p className="text-green-600 font-bold">Otwarte: {exists}</p>
        <p className="text-red-600 font-bold">Zamknięte: {closed}</p>
        <p className="text-blue-600 font-bold">Planowane: {planned}</p>
      </div>

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
          <label className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={showOpenNow}
              onChange={toggleOpenNow}
              className="w-4 h-4"
            />
            <span>Aktualnie otwarte</span>
          </label>

          {/* Sosy */}
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Sosy:</h3>
            <div className="grid grid-cols-4 gap-y-2 gap-x-4">
              {allSauces.map((sauce) => (
                <label key={sauce} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedSauces.includes(sauce)}
                    onChange={() => handleSauceToggle(sauce)}
                    className="w-4 h-4"
                  />
                  <span className="break-words text-sm">{sauce}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mięsa */}
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Mięsa:</h3>
            <div className="grid grid-cols-4 gap-y-2 gap-x-4">
              {allMeats.map((meat) => (
                <label key={meat} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedMeats.includes(meat)}
                    onChange={() => handleMeatToggle(meat)}
                    className="w-4 h-4"
                  />
                  <span className="break-words text-sm">{meat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opcje zamówienia */}
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Opcje zamówienia:</h3>
            <div className="grid grid-cols-4 gap-y-2 gap-x-4">
              {allOrderingOptions.map((option) => (
                <label key={option} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOrderingOptions.includes(option)}
                    onChange={() => handleOrderingOptionToggle(option)}
                    className="w-4 h-4"
                  />
                  <span className="break-words text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Strony */}
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Strony:</h3>
            <div className="grid grid-cols-4 gap-y-2 gap-x-4">
              {allPages.map((page) => (
                <label key={page} className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(page)}
                    onChange={() => handlePageToggle(page)}
                    className="w-4 h-4"
                  />
                  <span className="break-words text-sm capitalize">{page}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

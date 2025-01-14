import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import KebabsListClone from '../components/KebabListClone.js';
import SearchPanel from '../components/SearchPanel.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import kebab_icon from '../img/kebab_icon.png';
import axiosClient from '../axiosClient.js';

export default function MapClone() {
  const legnicaBounds = [
    [51.158, 16.114],
    [51.242, 16.260],
  ];

  const [kebabs, setKebabs] = useState([]);
  const [filteredKebabs, setFilteredKebabs] = useState([]);

  useEffect(() => {
    axiosClient
      .get('/kebabs')
      .then((response) => {
        setKebabs(response.data);
        setFilteredKebabs(response.data);
      })
      .catch((error) => {
        console.error('Błąd pobierania kebabów:', error);
      });
  }, []);

  const kebabIcon = new L.Icon({
    iconUrl: kebab_icon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const handleSearch = (filtered) => {
    setFilteredKebabs(filtered);
  };

  return (
    <div className="min-h-screen bg-lightGrayish">
      <Header />
      <main className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] px-4 py-2">
        {/* Mapa */}
        <div className="bg-mediumGray w-full lg:w-2/3 h-64 lg:h-full mb-4 lg:mb-0 lg:mr-4 flex items-center justify-center">
          <MapContainer
            bounds={legnicaBounds}
            className="size-full rounded-lg shadow-lg"
            scrollWheelZoom={true}
            maxBounds={legnicaBounds}
            maxBoundsViscosity={0.5}
            minZoom={13}
            worldCopyJump={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {filteredKebabs.map((kebab, index) => (
              <Marker
                key={kebab.id}
                position={[kebab.coordinates.lat, kebab.coordinates.lng]}
                icon={kebabIcon}
              >
                <Popup>
                  <b>{kebab.name}</b> <br />
                  {kebab.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="w-full lg:w-1/3 h-full overflow-hidden bg-gray-100 flex flex-col">
          <div className="sticky top-0 bg-gray-100 z-10 shadow-md">
            <SearchPanel kebabs={kebabs} onSearch={handleSearch} />
          </div>
          <div className="flex-grow overflow-y-auto">
            <KebabsListClone kebabs={filteredKebabs} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

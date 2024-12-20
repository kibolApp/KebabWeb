import React from 'react'
import '../index.css'
import Header from '../components/Header.js'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Footer from '../components/Footer.js'

export default function Map() {
  const legnicaBounds = [
    [51.165803, 16.148615],
    [51.232924, 16.177626],
    [51.202710, 16.245260],
  ]

  return (
    <div className="min-h-screen bg-lightGrayish">
      <Header />
      <main className="flex flex-col lg:flex-row h-[calc(100vh-6rem)] px-4 py-2">
        <div className="bg-mediumGray w-full lg:w-[73%] h-64 lg:h-full mb-4 lg:mb-0 lg:mr-2 flex items-center justify-center">
          <MapContainer 
            bounds={legnicaBounds} 
            className="size-full rounded-lg shadow-lg"
            scrollWheelZoom={true}
            maxBounds={legnicaBounds}
            maxBoundsViscosity={1.0}
            minZoom={13}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
        <div className="w-full lg:w-[24%] h-24 lg:h-full flex items-center justify-center text-center bg-white p-4 rounded-lg shadow-md">
          <p className="text-lg lg:text-xl">LISTA / TABELA</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

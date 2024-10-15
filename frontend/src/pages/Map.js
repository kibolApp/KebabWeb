import React from 'react'
import '../index.css'
import Header from '../components/Header'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const legnicaBounds = [
    [51.165803, 16.148615],
    [51.232924, 16.177626],
    [51.202710, 16.245260],
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex h-[calc(100vh-6rem)] px-4 py-2">
        <div className="bg-gray-300 w-[73%] h-full mr-2 flex items-center justify-center">
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
        <div className="w-[24%] h-full flex items-center justify-center text-center">
          <p className="text-xl">LISTA / TABELA</p>
        </div>
      </main>
    </div>
  )
}

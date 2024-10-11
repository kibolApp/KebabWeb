import React from 'react';
import './index.css';
import Header from './Header';

export default function Map() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="flex h-[calc(100vh-6rem)]">
        <div className="bg-gray-300 w-3/4 h-full mr-4 flex items-center justify-center">
          <h1 className="text-5xl font-bold">MAPA</h1>
        </div>
        <div className="w-1/4 h-full flex items-center justify-center text-center">
          <p className="text-xl">LISTA / TABELA</p>
        </div>
      </main>
    </div>
  );
}
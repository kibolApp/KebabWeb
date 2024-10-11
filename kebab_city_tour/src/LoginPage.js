import React from 'react';
import './index.css';
import Header from './Header';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-8">
        <div className="bg-gray-300 w-full h-96 flex items-center justify-center">
          <h1 className="text-5xl font-bold">Login</h1>
        </div>
      </main>
    </div>
  );
}

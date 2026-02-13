// archivo: src/components/Layout.jsx
// Componente Layout Gamer con Navbar y contenido

import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Efecto de fondo animado */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-transparent to-purple-500 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;

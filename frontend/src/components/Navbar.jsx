// archivo: src/components/Navbar.jsx
// Barra de navegación con tema Cyberpunk Gamer

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 border-b-2 border-cyan-500 shadow-2xl glow-cyan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Título GAMER */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold neon-glow">
              🎮 GAMER QUEST
            </h1>
            <p className="text-xs text-cyan-400">Platform v2.0 - Cyberpunk Edition</p>
          </motion.div>

          {/* Usuario y botón de logout */}
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {usuario && (
              <>
                {/* Stats del jugador */}
                <div className="hidden sm:block text-right border-r-2 border-purple-500 pr-6">
                  <p className="text-cyan-400 font-bold text-sm">👾 {usuario.nombre}</p>
                  <p className="text-green-400 text-xs">⚡ XP: {usuario.xp || 0}</p>
                  <p className="text-yellow-400 text-xs">🏆 LVL: {usuario.nivel || 1}</p>
                </div>

                {/* Botón de logout */}
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 border border-pink-400 glow-purple"
                >
                  🚪 LOGOUT
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

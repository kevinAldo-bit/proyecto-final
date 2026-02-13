// archivo: src/pages/Login.jsx
// Página de inicio de sesión - Tema Gamer Cyberpunk

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Manejar el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Validar campos
      if (!email || !password) {
        setError('Por favor completa todos los campos');
        setCargando(false);
        return;
      }

      // Hacer solicitud al backend
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      // Guardar token y usuario en el contexto y localStorage
      const { token, usuario } = response.data;
      login(token, usuario);

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err) {
      // Mostrar error del servidor o error genérico
      const mensaje = err.response?.data?.mensaje || 'Error al iniciar sesión. Intenta de nuevo.';
      setError(mensaje);
      console.error('Error en login:', err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4 relative overflow-hidden">
      {/* Efecto de fondo animado */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-transparent to-purple-500 animate-pulse"></div>
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card de login */}
        <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-lg shadow-2xl p-8 border-2 border-purple-500 glow-purple">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold neon-glow mb-2">🎮 GAMER QUEST</h2>
            <p className="text-cyan-400 text-sm">Sistema de autenticación v2.0</p>
            <p className="text-green-400 text-xs mt-2">Inicia sesión para continuar tu aventura</p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <motion.div 
              className="bg-red-900 border-2 border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6 glow-purple"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-cyan-400 font-bold mb-2">
                📧 EMAIL
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-slate-800 text-green-400 border-2 border-purple-500 rounded-lg placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-cyan-400 font-bold mb-2">
                🔒 CONTRASEÑA
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                className="w-full px-4 py-3 bg-slate-800 text-green-400 border-2 border-purple-500 rounded-lg placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Botón de Login */}
            <motion.button
              type="submit"
              disabled={cargando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 disabled:from-green-400 disabled:to-cyan-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6 border border-cyan-400 glow-cyan"
            >
              {cargando ? '⏳ CARGANDO...' : '🚀 INICIAR SESIÓN'}
            </motion.button>
          </form>

          {/* Enlace a registro */}
          <p className="text-gray-400 text-center mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-cyan-400 hover:text-green-400 font-bold transition">
              Regístrate aquí
            </Link>
          </p>

          {/* Banner inferior */}
          <div className="mt-8 pt-6 border-t border-purple-500">
            <p className="text-xs text-center text-purple-300">
              🎮 Bienvenido a la Plataforma Gamer
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

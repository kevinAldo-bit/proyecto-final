// archivo: src/pages/Register.jsx
// Página de registro - Tema Gamer Cyberpunk

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';
import { motion } from 'framer-motion';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !email || !password || !confirmarPassword) {
      return setError('Por favor completa todos los campos');
    }
    if (password !== confirmarPassword) {
      return setError('Las contraseñas no coinciden');
    }
    if (password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }

    setCargando(true);

    try {
      const response = await apiClient.post('/auth/registro', {
        nombre,
        email,
        password,
      });

      const { token, usuario } = response.data;
      login(token, usuario);

      navigate('/dashboard');
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al registrarse. Intenta de nuevo.';
      setError(mensaje);
      console.error('Error en registro:', err);
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
        {/* Card de registro */}
        <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-lg shadow-2xl p-8 border-2 border-purple-500 glow-purple">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold neon-glow mb-2">🎮 CREAR CUENTA</h2>
            <p className="text-cyan-400 text-sm">Únete a la Plataforma Gamer</p>
            <p className="text-green-400 text-xs mt-2">Comienza tu aventura hoy</p>
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
            {/* Campo Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-cyan-400 font-bold mb-2">
                👤 NOMBRE DE JUGADOR
              </label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre de jugador"
                className="w-full px-4 py-3 bg-slate-800 text-green-400 border-2 border-purple-500 rounded-lg placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 bg-slate-800 text-green-400 border-2 border-purple-500 rounded-lg placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmarPassword" className="block text-cyan-400 font-bold mb-2">
                🔒 CONFIRMAR CONTRASEÑA
              </label>
              <input
                type="password"
                id="confirmarPassword"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
                className="w-full px-4 py-3 bg-slate-800 text-green-400 border-2 border-purple-500 rounded-lg placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Botón de Registro */}
            <motion.button
              type="submit"
              disabled={cargando}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-6 border border-pink-400 glow-purple"
            >
              {cargando ? '⏳ CARGANDO...' : '✅ REGISTRARSE'}
            </motion.button>
          </form>

          {/* Enlace a login */}
          <p className="text-gray-400 text-center mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-green-400 font-bold transition">
              Inicia sesión aquí
            </Link>
          </p>

          {/* Banner inferior */}
          <div className="mt-8 pt-6 border-t border-purple-500">
            <p className="text-xs text-center text-purple-300">
              🎮 Plataforma GAMER 2.0 - Cyberpunk Edition
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
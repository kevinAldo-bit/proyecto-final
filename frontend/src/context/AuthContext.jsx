// archivo: src/context/AuthContext.jsx
// Contexto de autenticación para manejar el estado global del usuario

import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar el componente, verificar si hay un token guardado
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }

    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = (nuevoToken, nuevoUsuario) => {
    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
    
    // Guardar en localStorage
    localStorage.setItem('token', nuevoToken);
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
  };

  // Función para cerrar sesión
  const logout = () => {
    setToken(null);
    setUsuario(null);
    
    // Limpiar localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  };

  // Función para verificar si el usuario está autenticado
  const estaAutenticado = () => {
    return !!token && !!usuario;
  };

  // Valores que se compartirán a través del contexto
  const value = {
    usuario,
    token,
    loading,
    login,
    logout,
    estaAutenticado,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
};

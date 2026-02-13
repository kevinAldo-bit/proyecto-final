// archivo: src/components/ProtectedRoute.jsx
// Componente para proteger rutas que requieren autenticación

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente que verifica si el usuario está autenticado antes de permitir el acceso
const ProtectedRoute = ({ children }) => {
  const { estaAutenticado, loading } = useAuth();

  // Mostrar un mensaje de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
};

export default ProtectedRoute;

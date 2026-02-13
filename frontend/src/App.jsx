// archivo: src/App.jsx
// Componente principal de la aplicación Gamer con rutas

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardGamer from './pages/DashboardGamer';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta de registro */}
          <Route path="/registro" element={<Register />} />

          {/* Ruta protegida del dashboard GAMER */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardGamer />
              </ProtectedRoute>
            }
          />

          {/* Redirigir inicio a dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Ruta para página no encontrada */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// archivo: index.js
// Archivo principal del servidor Express (Plataforma Gamer)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Conectar a la base de datos
conectarDB();

// Middleware para parsear JSON
app.use(express.json());

// Middleware de CORS para permitir solicitudes del frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // Permitir cookies y credenciales
  })
);

// ============================================
// RUTAS DE LA API
// ============================================

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de misiones (antes tareas)
app.use('/api/misiones', taskRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/api/salud', (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: '✅ Servidor Gamer Online',
  });
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada',
  });
});

// Middleware global de manejo de errores (Evita que el servidor se caiga)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor',
    error: err.message
  });
});

// Configuración del Puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🎮 SISTEMA GAMER INVENTARIO PRO ONLINE`);
  console.log(`🚀 Ejecutándose en: http://localhost:${PORT}`);
  console.log('-------------------------------------------');
});
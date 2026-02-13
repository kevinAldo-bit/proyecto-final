// archivo: routes/authRoutes.js
// Rutas para autenticación (registro, login, perfil)

import express from 'express';
import { registro, login, obtenerPerfil } from '../controllers/authController.js';
import verificarToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
// POST /api/auth/registro
router.post('/registro', registro);

// Ruta para iniciar sesión
// POST /api/auth/login
router.post('/login', login);

// Ruta para obtener el perfil del usuario autenticado (requiere token)
// GET /api/auth/perfil
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;

// archivo: routes/misionRoutes.js
// Rutas para CRUD de misiones (requieren autenticación)

import express from 'express';
import {
  obtenerMisiones,
  crearMision,
  obtenerMision,
  actualizarMision,
  eliminarMision,
} from '../controllers/taskController.js';
import verificarToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware para verificar token en todas las rutas de misiones
router.use(verificarToken);

// Rutas para misiones
// GET /api/misiones - obtener todas las misiones del usuario
router.get('/', obtenerMisiones);

// POST /api/misiones - crear una nueva misión
router.post('/', crearMision);

// GET /api/misiones/:id - obtener una misión específica
router.get('/:id', obtenerMision);

// PUT /api/misiones/:id - actualizar una misión
router.put('/:id', actualizarMision);

// DELETE /api/misiones/:id - eliminar una misión
router.delete('/:id', eliminarMision);

export default router;

// archivo: middleware/authMiddleware.js
// Middleware para verificar tokens JWT y proteger rutas

import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  try {
    // Obtener el token del header Authorization (formato: Bearer <token>)
    const token = req.headers.authorization?.split(' ')[1];

    // Validar que el token exista
    if (!token) {
      return res.status(401).json({
        success: false,
        mensaje: 'No hay token, acceso denegado',
      });
    }

    // Verificar el token con la clave secreta
    const decifrado = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar la información del usuario al objeto request
    req.usuario = decifrado;

    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    // Si el token es inválido o expiró
    return res.status(401).json({
      success: false,
      mensaje: 'Token inválido o expirado',
      error: error.message,
    });
  }
};

export default verificarToken;

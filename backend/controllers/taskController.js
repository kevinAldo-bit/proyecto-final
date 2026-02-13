// archivo: controllers/misionController.js
// Controladores para CRUD de misiones (Plataforma Gamer)

import Mision from '../models/Task.js';
import Usuario from '../models/User.js';

// Obtener todas las misiones del usuario autenticado
export const obtenerMisiones = async (req, res) => {
  try {
    // Usar req.usuario.id del token JWT para filtrar misiones del usuario
    const misiones = await Mision.find({ usuario: req.usuario.id }).populate('usuario', 'nombre email xp nivel');

    res.status(200).json({
      success: true,
      misiones,
    });
  } catch (error) {
    console.error('Error al obtener misiones:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener misiones',
      error: error.message,
    });
  }
};

// Crear una nueva misión
export const crearMision = async (req, res) => {
  try {
    const { titulo, descripcion, estado, dificultad, recompensaXP, recompensaOro, genero, plataforma, fechaVencimiento, esBonus } = req.body;

    // Validar que el título esté presente
    if (!titulo) {
      return res.status(400).json({
        success: false,
        mensaje: 'El título de la misión es obligatorio',
      });
    }

    // Crear nueva misión con el usuario del token
    const nuevaMision = new Mision({
      titulo,
      descripcion,
      estado: estado || 'aceptada',
      dificultad: dificultad || 'normal',
      recompensaXP: recompensaXP || 100,
      recompensaOro: recompensaOro || 50,
      genero,
      plataforma: plataforma || 'Multiplataforma',
      fechaVencimiento,
      esBonus: esBonus || false,
      usuario: req.usuario.id,
    });

    // Guardar la misión en la base de datos
    await nuevaMision.save();

    // Populate para obtener datos del usuario
    await nuevaMision.populate('usuario', 'nombre email xp nivel');

    res.status(201).json({
      success: true,
      mensaje: '🎮 Misión creada exitosamente',
      mision: nuevaMision,
    });
  } catch (error) {
    console.error('Error al crear misión:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al crear la misión',
      error: error.message,
    });
  }
};

// Obtener una misión específica por ID
export const obtenerMision = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la misión y verificar que pertenezca al usuario
    const mision = await Mision.findById(id).populate('usuario', 'nombre email xp nivel');

    if (!mision) {
      return res.status(404).json({
        success: false,
        mensaje: 'Misión no encontrada',
      });
    }

    // Verificar que la misión pertenezca al usuario autenticado
    if (mision.usuario._id.toString() !== req.usuario.id) {
      return res.status(403).json({
        success: false,
        mensaje: 'No tienes permiso para acceder a esta misión',
      });
    }

    res.status(200).json({
      success: true,
      mision,
    });
  } catch (error) {
    console.error('Error al obtener misión:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener la misión',
      error: error.message,
    });
  }
};

// Actualizar una misión
export const actualizarMision = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado, dificultad, recompensaXP, recompensaOro, genero, plataforma, fechaVencimiento, puntuacion, esBonus } = req.body;

    // Buscar la misión
    const mision = await Mision.findById(id);

    if (!mision) {
      return res.status(404).json({
        success: false,
        mensaje: 'Misión no encontrada',
      });
    }

    // Verificar que la misión pertenezca al usuario autenticado
    if (mision.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({
        success: false,
        mensaje: 'No tienes permiso para actualizar esta misión',
      });
    }

    // Actualizar los campos proporcionados
    if (titulo) mision.titulo = titulo;
    if (descripcion) mision.descripcion = descripcion;
    if (estado) mision.estado = estado;
    if (dificultad) mision.dificultad = dificultad;
    if (recompensaXP) mision.recompensaXP = recompensaXP;
    if (recompensaOro) mision.recompensaOro = recompensaOro;
    if (genero) mision.genero = genero;
    if (plataforma) mision.plataforma = plataforma;
    if (fechaVencimiento) mision.fechaVencimiento = fechaVencimiento;
    if (puntuacion !== undefined) mision.puntuacion = puntuacion;
    if (esBonus !== undefined) mision.esBonus = esBonus;

    // Si la misión se completa, agregar XP al usuario
    if (estado === 'completada' && mision.estado !== 'completada') {
      const usuario = await Usuario.findById(req.usuario.id);
      usuario.xp += mision.recompensaXP;
      // Calcular nivel (cada nivel necesita 1000 XP)
      usuario.nivel = Math.floor(usuario.xp / 1000) + 1;
      await usuario.save();
    }

    // Guardar los cambios
    await mision.save();

    // Populate para obtener datos del usuario
    await mision.populate('usuario', 'nombre email xp nivel');

    res.status(200).json({
      success: true,
      mensaje: '✅ Misión actualizada y XP asignado',
      mision,
    });
  } catch (error) {
    console.error('Error al actualizar misión:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar la misión',
      error: error.message,
    });
  }
};

// Eliminar una misión
export const eliminarMision = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la misión
    const mision = await Mision.findById(id);

    if (!mision) {
      return res.status(404).json({
        success: false,
        mensaje: 'Misión no encontrada',
      });
    }

    // Verificar que la misión pertenezca al usuario autenticado
    if (mision.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({
        success: false,
        mensaje: 'No tienes permiso para eliminar esta misión',
      });
    }

    // Eliminar la misión
    await Mision.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      mensaje: '🗑️ Misión eliminada exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar misión:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar la misión',
      error: error.message,
    });
  }
};

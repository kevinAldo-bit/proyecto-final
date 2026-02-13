// archivo: models/Task.js (Ahora Mission.js)
// Esquema de misión con relación al usuario (Plataforma Gamer)

import mongoose from 'mongoose';

// Definir el esquema de la MISIÓN (antes era tarea)
const misionSchema = new mongoose.Schema(
  {
    // Nombre/Título de la misión
    titulo: {
      type: String,
      required: [true, 'El título de la misión es obligatorio'],
      trim: true,
    },

    // Descripción de la misión
    descripcion: {
      type: String,
      trim: true,
    },

    // Estado de la misión (aceptada, en progreso, completada, fracasada)
    estado: {
      type: String,
      enum: ['aceptada', 'en progreso', 'completada', 'fracasada'],
      default: 'aceptada',
    },

    // Dificultad de la misión (fácil, normal, difícil, épica, legendaria)
    dificultad: {
      type: String,
      enum: ['fácil', 'normal', 'difícil', 'épica', 'legendaria'],
      default: 'normal',
    },

    // Recompensa en XP (experiencia)
    recompensaXP: {
      type: Number,
      default: 100,
    },

    // Recompensa en moneda virtual
    recompensaOro: {
      type: Number,
      default: 50,
    },

    // Género/Categoría de la misión (RPG, FPS, Estrategia, Aventura, etc.)
    genero: {
      type: String,
      default: 'General',
    },

    // Plataforma recomendada (PC, PS5, Xbox, Nintendo Switch, Multiplataforma)
    plataforma: {
      type: String,
      enum: ['PC', 'PS5', 'Xbox', 'Nintendo Switch', 'Multiplataforma'],
      default: 'Multiplataforma',
    },

    // Referencia al usuario propietario de la misión
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },

    // Fecha de vencimiento de la misión (deadline)
    fechaVencimiento: {
      type: Date,
    },

    // Puntuación obtenida (0-100)
    puntuacion: {
      type: Number,
      min: 0,
      max: 100,
    },

    // Indica si la misión es secreta/bonus
    esBonus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Crear el modelo de Misión
const Mision = mongoose.model('Mision', misionSchema);

export default Mision;

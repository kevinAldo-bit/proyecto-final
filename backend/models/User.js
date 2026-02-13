// archivo: models/User.js
// Esquema de usuario con campos para email, contraseña, nombre, rol y experiencia (Plataforma Gamer)

import mongoose from 'mongoose';

// Definir el esquema del usuario GAMER
const userSchema = new mongoose.Schema(
  {
    // Nombre del usuario
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },

    // Email único del usuario
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingresa un email válido'],
    },

    // Contraseña encriptada (no se deberá guardar en texto plano)
    contraseña: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: 6,
      select: false, // No incluir contraseña por defecto en consultas
    },

    // Rol del usuario (jugador, admin)
    role: {
      type: String,
      enum: ['jugador', 'admin'],
      default: 'jugador',
    },

    // Puntos de experiencia (XP)
    xp: {
      type: Number,
      default: 0,
    },

    // Nivel del jugador
    nivel: {
      type: Number,
      default: 1,
    },

    // Avatar/plataforma preferida del jugador
    plataforma: {
      type: String,
      enum: ['PC', 'PS5', 'Xbox', 'Nintendo Switch', ''],
      default: '',
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', userSchema);

export default Usuario;

import Usuario from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

// Función para generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// 1. REGISTRO
export const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor completa todos los campos',
      });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email ya está registrado',
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const contraseñaEncriptada = await bcryptjs.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: contraseñaEncriptada,
    });

    await nuevoUsuario.save();
    const token = generarToken(nuevoUsuario._id);

    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: { id: nuevoUsuario._id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error al conectar con la base de datos',
      error: error.message,
    });
  }
};

// 2. LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor ingresa email y contraseña',
      });
    }

    const usuario = await Usuario.findOne({ email }).select('+contraseña');

    if (!usuario || !(await bcryptjs.compare(password, usuario.contraseña))) {
      return res.status(400).json({
        success: false,
        mensaje: 'Email o contraseña incorrectos',
      });
    }

    const token = generarToken(usuario._id);
    res.status(200).json({
      success: true,
      mensaje: 'Sesión iniciada exitosamente',
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: 'Error al iniciar sesión' });
  }
};

// 3. PERFIL (La que causaba el error)
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({
      success: true,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: 'Error al obtener el perfil' });
  }
};
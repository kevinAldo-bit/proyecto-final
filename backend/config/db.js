// archivo: config/db.js
// Configura la conexión a MongoDB usando Mongoose

import mongoose from 'mongoose';

// Función para conectar a la base de datos
const conectarDB = async () => {
  try {
    // Obtener la URI de MongoDB de las variables de entorno
    const mongoURI = process.env.MONGODB_URI;

    // Conectar a MongoDB con opciones recomendadas
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado a MongoDB exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

export default conectarDB;

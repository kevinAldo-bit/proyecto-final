// archivo: src/pages/DashboardGamer.jsx
// Dashboard GAMER con Misiones y generador de PDF

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import apiClient from '../api/axiosConfig';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const DashboardGamer = () => {
  const [misiones, setMisiones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [usuario, setUsuario] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    estado: 'aceptada',
    dificultad: 'normal',
    recompensaXP: 100,
    recompensaOro: 50,
    genero: 'General',
    plataforma: 'Multiplataforma',
    fechaVencimiento: '',
    esBonus: false,
  });

  // Cargar misiones al montar el componente
  useEffect(() => {
    cargarMisiones();
    cargarPerfil();
  }, []);

  // Función para cargar todas las misiones
  const cargarMisiones = async () => {
    try {
      setCargando(true);
      setError('');

      const response = await apiClient.get('/misiones');
      setMisiones(response.data.misiones || []);
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al cargar las misiones';
      setError(mensaje);
      console.error('Error al cargar misiones:', err);
    } finally {
      setCargando(false);
    }
  };

  // Cargar perfil del usuario
  const cargarPerfil = async () => {
    try {
      const response = await apiClient.get('/auth/perfil');
      setUsuario(response.data.usuario);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
    }
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Crear o actualizar una misión
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.titulo) {
        setError('El título es obligatorio');
        return;
      }

      const datosEnvio = {
        ...formData,
        recompensaXP: parseInt(formData.recompensaXP),
        recompensaOro: parseInt(formData.recompensaOro),
      };

      if (editandoId) {
        // Actualizar misión existente
        const response = await apiClient.put(`/misiones/${editandoId}`, datosEnvio);
        setMisiones(misiones.map((m) => (m._id === editandoId ? response.data.mision : m)));
        setEditandoId(null);
      } else {
        // Crear nueva misión
        const response = await apiClient.post('/misiones', datosEnvio);
        setMisiones([...misiones, response.data.mision]);
      }

      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        estado: 'aceptada',
        dificultad: 'normal',
        recompensaXP: 100,
        recompensaOro: 50,
        genero: 'General',
        plataforma: 'Multiplataforma',
        fechaVencimiento: '',
        esBonus: false,
      });
      setMostrarFormulario(false);
      setError('');
      cargarPerfil(); // Recargar perfil para actualizar XP
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al guardar la misión';
      setError(mensaje);
      console.error('Error al guardar misión:', err);
    }
  };

  // Cargar datos de una misión para editar
  const handleEditar = (mision) => {
    setFormData({
      titulo: mision.titulo,
      descripcion: mision.descripcion || '',
      estado: mision.estado,
      dificultad: mision.dificultad,
      recompensaXP: mision.recompensaXP,
      recompensaOro: mision.recompensaOro,
      genero: mision.genero,
      plataforma: mision.plataforma,
      fechaVencimiento: mision.fechaVencimiento ? mision.fechaVencimiento.split('T')[0] : '',
      esBonus: mision.esBonus,
    });
    setEditandoId(mision._id);
    setMostrarFormulario(true);
  };

  // Eliminar una misión
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta misión?')) {
      try {
        await apiClient.delete(`/misiones/${id}`);
        setMisiones(misiones.filter((m) => m._id !== id));
      } catch (err) {
        const mensaje = err.response?.data?.mensaje || 'Error al eliminar la misión';
        setError(mensaje);
        console.error('Error al eliminar misión:', err);
      }
    }
  };

  // Cancelar edición
  const handleCancelar = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      estado: 'aceptada',
      dificultad: 'normal',
      recompensaXP: 100,
      recompensaOro: 50,
      genero: 'General',
      plataforma: 'Multiplataforma',
      fechaVencimiento: '',
      esBonus: false,
    });
    setEditandoId(null);
    setMostrarFormulario(false);
  };

  // Generar PDF de Reporte de Batalla
  const generarReportePDF = async () => {
    try {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      let yPosition = 20;

      // Encabezado
      doc.setFontSize(24);
      doc.setTextColor(0, 255, 136);
      doc.text('⚔️ REPORTE DE BATALLA ⚔️', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      doc.setFontSize(12);
      doc.setTextColor(0, 255, 255);
      doc.text(`Jugador: ${usuario?.nombre || 'Desconocido'}`, 20, yPosition);
      
      yPosition += 8;
      doc.setTextColor(255, 255, 0);
      doc.text(`XP Total: ${usuario?.xp || 0} | Nivel: ${usuario?.nivel || 1}`, 20, yPosition);
      
      yPosition += 15;
      doc.setDrawColor(213, 0, 249);
      doc.line(20, yPosition, pageWidth - 20, yPosition);

      yPosition += 10;
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text('MISIONES COMPLETADAS', 20, yPosition);

      yPosition += 10;
      doc.setFontSize(10);

      // Misiones completadas
      const misionesCompletadas = misiones.filter(m => m.estado === 'completada');
      
      if (misionesCompletadas.length === 0) {
        doc.setTextColor(255, 100, 100);
        doc.text('No hay misiones completadas aún', 20, yPosition);
      } else {
        misionesCompletadas.forEach((mision, index) => {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = 20;
          }

          doc.setTextColor(0, 255, 136);
          doc.text(`${index + 1}. ${mision.titulo}`, 20, yPosition);
          
          yPosition += 7;
          doc.setTextColor(200, 200, 200);
          doc.setFontSize(9);
          doc.text(`Dificultad: ${mision.dificultad} | Plataforma: ${mision.plataforma} | XP: +${mision.recompensaXP}`, 25, yPosition);
          
          yPosition += 10;
          doc.setFontSize(10);
        });
      }

      // Resumen
      yPosition += 10;
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setDrawColor(213, 0, 249);
      doc.line(20, yPosition, pageWidth - 20, yPosition);

      yPosition += 10;
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 0);
      const totalXP = misionesCompletadas.reduce((sum, m) => sum + m.recompensaXP, 0);
      doc.text(`Total XP Ganado: ${totalXP}`, 20, yPosition);
      
      yPosition += 8;
      doc.text(`Misiones Totales: ${misiones.length}`, 20, yPosition);
      
      yPosition += 8;
      doc.text(`Misiones Completadas: ${misionesCompletadas.length}`, 20, yPosition);

      // Pie de página
      yPosition = pageHeight - 15;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, pageWidth / 2, yPosition, { align: 'center' });

      // Descargar PDF
      doc.save(`reporte-batalla-${usuario?.nombre || 'jugador'}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      setError('Error al generar el PDF');
    }
  };

  // Obtener color según la dificultad
  const getColorDificultad = (dificultad) => {
    const colores = {
      'fácil': 'bg-green-500 text-white',
      'normal': 'bg-blue-500 text-white',
      'difícil': 'bg-orange-500 text-white',
      'épica': 'bg-purple-500 text-white',
      'legendaria': 'bg-red-500 text-white',
    };
    return colores[dificultad] || 'bg-gray-500 text-white';
  };

  // Obtener icono según el estado
  const getIconoEstado = (estado) => {
    const iconos = {
      'aceptada': '📋',
      'en progreso': '⚔️',
      'completada': '✅',
      'fracasada': '❌',
    };
    return iconos[estado] || '❓';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Encabezado con botones */}
        <motion.div 
          className="flex justify-between items-center flex-wrap gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-5xl font-bold neon-glow">🎮 CENTRO DE MISIONES</h1>
            <p className="text-cyan-400 text-sm mt-2">Sistema de Gestión de Batallas v2.0</p>
          </div>

          <div className="flex gap-4">
            <motion.button
              onClick={generarReportePDF}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-2 px-6 rounded-lg border border-yellow-400 glow-purple"
            >
              📊 REPORTE PDF
            </motion.button>

            <motion.button
              onClick={() => {
                if (mostrarFormulario && !editandoId) {
                  setMostrarFormulario(false);
                } else {
                  handleCancelar();
                  setMostrarFormulario(true);
                }
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold py-2 px-6 rounded-lg border border-cyan-400 glow-cyan"
            >
              {mostrarFormulario ? '❌ CANCELAR' : '➕ NUEVA MISIÓN'}
            </motion.button>
          </div>
        </motion.div>

        {/* Mensaje de error */}
        {error && (
          <motion.div 
            className="bg-red-900 border-2 border-red-500 text-red-100 px-4 py-3 rounded-lg glow-purple"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Formulario de crear/editar misión */}
        {mostrarFormulario && (
          <motion.div 
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-lg shadow-2xl p-8 border-2 border-purple-500 glow-purple"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              {editandoId ? '✏️ EDITAR MISIÓN' : '✨ CREAR NUEVA MISIÓN'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-green-400 font-bold mb-2">TÍTULO DE LA MISIÓN</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleFormChange}
                  placeholder="Ingresa el título de la misión"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400 placeholder-gray-500 focus:border-cyan-400"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-green-400 font-bold mb-2">DESCRIPCIÓN</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleFormChange}
                  placeholder="Describe los detalles de la misión"
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400 placeholder-gray-500 focus:border-cyan-400"
                ></textarea>
              </div>

              {/* Grid de campos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Estado */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">ESTADO</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400"
                  >
                    <option value="aceptada">📋 Aceptada</option>
                    <option value="en progreso">⚔️ En Progreso</option>
                    <option value="completada">✅ Completada</option>
                    <option value="fracasada">❌ Fracasada</option>
                  </select>
                </div>

                {/* Dificultad */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">DIFICULTAD</label>
                  <select
                    name="dificultad"
                    value={formData.dificultad}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400"
                  >
                    <option value="fácil">🟢 Fácil</option>
                    <option value="normal">🔵 Normal</option>
                    <option value="difícil">🟠 Difícil</option>
                    <option value="épica">🟣 Épica</option>
                    <option value="legendaria">🔴 Legendaria</option>
                  </select>
                </div>

                {/* Plataforma */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">PLATAFORMA</label>
                  <select
                    name="plataforma"
                    value={formData.plataforma}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400"
                  >
                    <option value="PC">💻 PC</option>
                    <option value="PS5">🎮 PS5</option>
                    <option value="Xbox">🎮 Xbox</option>
                    <option value="Nintendo Switch">🎮 Switch</option>
                    <option value="Multiplataforma">🌐 Multi</option>
                  </select>
                </div>

                {/* Género */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">GÉNERO</label>
                  <input
                    type="text"
                    name="genero"
                    value={formData.genero}
                    onChange={handleFormChange}
                    placeholder="RPG, FPS, etc"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400 text-sm"
                  />
                </div>
              </div>

              {/* Recompensas y fecha */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* XP */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">RECOMPENSA XP ⚡</label>
                  <input
                    type="number"
                    name="recompensaXP"
                    value={formData.recompensaXP}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400"
                  />
                </div>

                {/* Oro */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">RECOMPENSA ORO 💰</label>
                  <input
                    type="number"
                    name="recompensaOro"
                    value={formData.recompensaOro}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400"
                  />
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-green-400 font-bold mb-2 text-sm">DEADLINE 📅</label>
                  <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border-2 border-purple-500 text-green-400 text-sm"
                  />
                </div>

                {/* Bonus */}
                <div className="flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="esBonus"
                      checked={formData.esBonus}
                      onChange={handleFormChange}
                      className="w-5 h-5"
                    />
                    <span className="text-green-400 font-bold">🎁 BONUS</span>
                  </label>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-lg border border-cyan-400 glow-cyan"
                >
                  {editandoId ? '💾 GUARDAR CAMBIOS' : '✅ CREAR MISIÓN'}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleCancelar}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg border border-pink-400"
                >
                  ❌ CANCELAR
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Misiones - Grid de Tarjetas */}
        {cargando ? (
          <motion.div 
            className="flex items-center justify-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-2xl neon-glow">⏳ CARGANDO MISIONES...</div>
          </motion.div>
        ) : misiones.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl text-cyan-400">📭 No tienes misiones aún.</p>
            <p className="text-green-400 text-lg mt-2">¡Crea una misión épica ahora!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misiones.map((mision, index) => (
              <motion.div 
                key={mision._id}
                className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-lg p-6 border-2 border-purple-500 hover:border-cyan-400 transition-all duration-300 glow-purple hover:shadow-2xl relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Bonus Badge */}
                {mision.esBonus && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm">
                    🎁 BONUS
                  </div>
                )}

                {/* Título */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-cyan-400 break-words">
                    {getIconoEstado(mision.estado)} {mision.titulo}
                  </h3>
                </div>

                {/* Descripción */}
                {mision.descripcion && (
                  <p className="text-green-300 text-sm mb-4 min-h-12">{mision.descripcion}</p>
                )}

                {/* Badges de Estado y Dificultad */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getColorDificultad(mision.dificultad)}`}>
                    {mision.dificultad.toUpperCase()}
                  </span>
                  <span className="bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                    {mision.plataforma}
                  </span>
                </div>

                {/* Recompensas */}
                <div className="bg-slate-800 rounded-lg p-3 mb-4 border border-purple-400">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-yellow-400">⚡ XP: {mision.recompensaXP}</span>
                    <span className="text-green-400">💰 ORO: {mision.recompensaOro}</span>
                  </div>
                  {mision.fechaVencimiento && (
                    <div className="text-cyan-400 text-xs">
                      📅 {new Date(mision.fechaVencimiento).toLocaleDateString('es-ES')}
                    </div>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleEditar(mision)}
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 px-3 rounded-lg border border-cyan-400 text-sm transition duration-200"
                  >
                    ✏️ EDITAR
                  </motion.button>

                  <motion.button
                    onClick={() => handleEliminar(mision._id)}
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-3 rounded-lg border border-pink-400 text-sm transition duration-200"
                  >
                    🗑️ ELIMINAR
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardGamer;

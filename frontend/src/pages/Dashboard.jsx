// archivo: src/pages/Dashboard.jsx
// Dashboard GAMER con Misiones y generador de PDF

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import apiClient from '../api/axiosConfig';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
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
    fechaVencimiento: '',
  });

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  // Función para cargar todas las tareas
  const cargarTareas = async () => {
    try {
      setCargando(true);
      setError('');

      const response = await apiClient.get('/tareas');
      setTareas(response.data.tareas || []);
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al cargar las tareas';
      setError(mensaje);
      console.error('Error al cargar tareas:', err);
    } finally {
      setCargando(false);
    }
  };

  // Manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Crear o actualizar una tarea
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.titulo) {
        setError('El título es obligatorio');
        return;
      }

      if (editandoId) {
        // Actualizar tarea existente
        const response = await apiClient.put(`/tareas/${editandoId}`, formData);
        setTareas(tareas.map((t) => (t._id === editandoId ? response.data.tarea : t)));
        setEditandoId(null);
      } else {
        // Crear nueva tarea
        const response = await apiClient.post('/tareas', formData);
        setTareas([...tareas, response.data.tarea]);
      }

      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        estado: 'pendiente',
        prioridad: 'media',
        fechaVencimiento: '',
      });
      setMostrarFormulario(false);
      setError('');
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al guardar la tarea';
      setError(mensaje);
      console.error('Error al guardar tarea:', err);
    }
  };

  // Cargar datos de una tarea para editar
  const handleEditar = (tarea) => {
    setFormData({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion || '',
      estado: tarea.estado,
      prioridad: tarea.prioridad,
      fechaVencimiento: tarea.fechaVencimiento ? tarea.fechaVencimiento.split('T')[0] : '',
    });
    setEditandoId(tarea._id);
    setMostrarFormulario(true);
  };

  // Eliminar una tarea
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await apiClient.delete(`/tareas/${id}`);
        setTareas(tareas.filter((t) => t._id !== id));
      } catch (err) {
        const mensaje = err.response?.data?.mensaje || 'Error al eliminar la tarea';
        setError(mensaje);
        console.error('Error al eliminar tarea:', err);
      }
    }
  };

  // Cancelar edición
  const handleCancelar = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      estado: 'pendiente',
      prioridad: 'media',
      fechaVencimiento: '',
    });
    setEditandoId(null);
    setMostrarFormulario(false);
  };

  // Obtener color según la prioridad
  const getColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtener color según el estado
  const getColorEstado = (estado) => {
    switch (estado) {
      case 'completada':
        return 'bg-green-500';
      case 'en progreso':
        return 'bg-blue-500';
      case 'pendiente':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">📊 Mis Tareas</h1>
          <button
            onClick={() => {
              if (mostrarFormulario && !editandoId) {
                setMostrarFormulario(false);
              } else {
                handleCancelar();
                setMostrarFormulario(true);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            {mostrarFormulario ? '❌ Cancelar' : '➕ Nueva Tarea'}
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Formulario de crear/editar tarea */}
        {mostrarFormulario && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editandoId ? '✏️ Editar Tarea' : '✨ Nueva Tarea'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleFormChange}
                  placeholder="Ingresa el título de la tarea"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleFormChange}
                  placeholder="Ingresa la descripción de la tarea"
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Grid de estado, prioridad y fecha */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Estado */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Estado</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                  </select>
                </div>

                {/* Prioridad */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Prioridad</label>
                  <select
                    name="prioridad"
                    value={formData.prioridad}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                {/* Fecha de vencimiento */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Fecha Vencimiento</label>
                  <input
                    type="date"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  {editandoId ? '💾 Guardar Cambios' : '✅ Crear Tarea'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelar}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                >
                  ❌ Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tareas - Lista */}
        {cargando ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">⏳ Cargando tareas...</div>
          </div>
        ) : tareas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">📭 No tienes tareas aún. ¡Crea una nueva!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tareas.map((tarea) => (
              <div key={tarea._id} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200">
                {/* Título y estado */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white flex-1">{tarea.titulo}</h3>
                  <span className={`${getColorEstado(tarea.estado)} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {tarea.estado}
                  </span>
                </div>

                {/* Descripción */}
                {tarea.descripcion && (
                  <p className="text-gray-300 text-sm mb-3">{tarea.descripcion}</p>
                )}

                {/* Prioridad y fecha */}
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getColorPrioridad(tarea.prioridad)}`}>
                    {tarea.prioridad}
                  </span>
                  {tarea.fechaVencimiento && (
                    <span className="text-gray-400 text-xs">
                      📅 {new Date(tarea.fechaVencimiento).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditar(tarea)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200 text-sm"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(tarea._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition duration-200 text-sm"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

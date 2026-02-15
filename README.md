Proyecto Final – MERN Stack
Descripción

Este proyecto es una aplicación web para la gestión de tareas (To-Do List) desarrollada como proyecto final utilizando el stack MERN.
La aplicación permite a los usuarios registrarse, iniciar sesión y administrar sus propias tareas de forma segura.

El objetivo principal del proyecto es poner en práctica el desarrollo full stack, trabajando tanto el backend como el frontend y la comunicación entre ambos.

Tecnologías utilizadas:

MongoDB (base de datos)

Express y Node.js (backend)

React (frontend)

Tailwind CSS (estilos)

Funcionalidades

Registro e inicio de sesión de usuarios

Autenticación mediante JWT

Crear, editar y eliminar tareas

Cambiar el estado y la prioridad de las tareas

Protección de rutas (solo usuarios autenticados)

Interfaz responsiva adaptable a distintos dispositivos

Estructura del proyecto

El proyecto está dividido en dos partes principales:

Backend: maneja la lógica del servidor, autenticación, API y conexión a la base de datos.

Frontend: contiene la interfaz de usuario y la interacción con la API.

backend/
  config/
  controllers/
  models/
  routes/
  middleware/
  index.js

frontend/
  src/
    components/
    pages/
    context/
    api/
  index.html

Instalación y configuración
Requisitos

Node.js

npm

MongoDB (local o en la nube)

Backend

Entrar a la carpeta del backend:

cd backend
npm install


Crear el archivo .env y configurar:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/proyecto-final
JWT_SECRET=clave_secreta


Ejecutar el servidor:

npm run dev

Frontend

Entrar a la carpeta del frontend:

cd frontend
npm install


Configurar el archivo .env:

VITE_API_URL=http://localhost:5000/api


Ejecutar la aplicación:

npm run dev

Uso de la aplicación

Abrir el navegador en http://localhost:5173

Registrar un nuevo usuario

Iniciar sesión

Acceder al panel principal

Crear, editar o eliminar tareas según sea necesario

Cada usuario solo puede ver y administrar sus propias tareas.

Seguridad

Las contraseñas se almacenan cifradas

Se utilizan tokens JWT para la autenticación

Las rutas protegidas verifican el token en cada petición

Las variables sensibles se manejan mediante archivos .env

Notas finales

Este proyecto fue desarrollado con fines académicos y de aprendizaje, aplicando conceptos de:

Programación backend y frontend

Autenticación de usuarios

Arquitectura cliente-servidor

Consumo de APIs REST
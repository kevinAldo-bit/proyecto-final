# Proyecto Final MERN Stack

## 🚀 Descripción

Proyecto completo de una aplicación web para gestionar tareas (To-Do List) desarrollado con el **MERN Stack**:
- **M**ongoDB: Base de datos NoSQL
- **E**xpress: Framework backend
- **R**eact: Librería frontend
- **N**ode.js: Runtime de JavaScript

## ✨ Características principales

✅ Autenticación de usuarios con JWT
✅ Registrarse e iniciar sesión
✅ Crear, editar y eliminar tareas
✅ Cambiar estado y prioridad de tareas
✅ Interfaz moderna con Tailwind CSS
✅ Diseño responsive (funciona en mobile, tablet y desktop)
✅ Protección de rutas (solo usuarios autenticados pueden acceder)

## 📁 Estructura del Proyecto

```
proyecto-final/
├── backend/
│   ├── config/
│   │   └── db.js (Conexión a MongoDB)
│   ├── controllers/
│   │   ├── authController.js (Login, registro)
│   │   └── taskController.js (CRUD de tareas)
│   ├── middleware/
│   │   └── authMiddleware.js (Verificar JWT)
│   ├── models/
│   │   ├── User.js (Esquema de usuario)
│   │   └── Task.js (Esquema de tarea)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── index.js (Servidor principal)
│   ├── package.json
│   └── .env (Variables de entorno)
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Layout.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx (Estado global de autenticación)
    │   ├── api/
    │   │   └── axiosConfig.js (Configuración de peticiones HTTP)
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   └── .env (Variables de entorno)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🛠️ Instalación

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn
- MongoDB (Local o Atlas - servicio en la nube)

### Paso 1: Instalar dependencias del Backend

```bash
cd backend
npm install
```

### Paso 2: Configurar variables de entorno del Backend

Edita el archivo `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/proyecto-final
JWT_SECRET=tu_clave_secreta_super_segura_123456789
FRONTEND_URL=http://localhost:5173
```

**Nota:** Si usas MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/proyecto-final
```

### Paso 3: Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

### Paso 4: Configurar variables de entorno del Frontend

El archivo `frontend/.env` ya está configurado correctamente:

```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Ejecutar la aplicación

### Terminal 1: Ejecutar el Backend

```bash
cd backend
npm run dev
```

Deberías ver:
```
✅ Conectado a MongoDB exitosamente
🚀 Servidor ejecutándose en http://localhost:5000
```

### Terminal 2: Ejecutar el Frontend

```bash
cd frontend
npm run dev
```

Deberías ver:
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## 📱 Usar la aplicación

1. Abre en tu navegador: **http://localhost:5173**
2. Haz click en "Regístrate aquí" para crear una nueva cuenta
3. Completa el formulario con:
   - Nombre
   - Email
   - Contraseña (mínimo 6 caracteres)
4. Una vez registrado, verás el **Dashboard** con tus tareas
5. Crea tareas haciendo click en "➕ Nueva Tarea"
6. Edita o elimina tareas según necesites

## 🔐 Seguridad

- Las contraseñas se encriptan con **bcryptjs**
- Los tokens JWT expiran en 7 días
- Las rutas están protegidas - solo usuarios autenticados pueden acceder
- El middleware de autenticación verifica el token en cada solicitud

## 📡 Endpoints de la API

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/registro` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/perfil` | Obtener datos del usuario (requiere token) |

### Tareas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tareas` | Obtener todas las tareas del usuario |
| POST | `/api/tareas` | Crear nueva tarea |
| GET | `/api/tareas/:id` | Obtener una tarea específica |
| PUT | `/api/tareas/:id` | Actualizar una tarea |
| DELETE | `/api/tareas/:id` | Eliminar una tarea |

## 🧪 Probar con Postman/cURL

### Ejemplo 1: Registrarse

```bash
curl -X POST http://localhost:5000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","email":"juan@example.com","contraseña":"123456"}'
```

### Ejemplo 2: Iniciar sesión

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","contraseña":"123456"}'
```

### Ejemplo 3: Crear tareas (reemplaza TOKEN con el token recibido)

```bash
curl -X POST http://localhost:5000/api/tareas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"titulo":"Mi primera tarea","descripcion":"Descripción de la tarea","prioridad":"alta"}'
```

## 🎨 Personalización

### Cambiar colores

Edita `frontend/tailwind.config.js` para modificar los colores de la aplicación.

### Cambiar nombre de la aplicación

- Frontend: Edita el título en `frontend/index.html`
- Navbar: Edita `frontend/src/components/Navbar.jsx`

## 📝 Notas importantes

- **No commits con secretos:** Nunca commitas tu `.env` con la clave JWT real
- **MongoDB Connection:** Asegúrate de que MongoDB esté corriendo antes de iniciar el backend
- **Puerto 5173:** El frontend usa este puerto, asegúrate de que esté disponible
- **Puerto 5000:** El backend usa este puerto, asegúrate de que esté disponible

## 🐛 Solución de problemas

### "Cannot find module 'express'"
```bash
cd backend && npm install
```

### "Cannot find module 'react'"
```bash
cd frontend && npm install
```

### "MongoDB connection failed"
- Verifica que MongoDB esté corriendo
- Verifica la URI en `backend/.env`
- Si usas MongoDB Atlas, agrega tu IP a la whitelist

### "Port 5000 is already in use"
```bash
# Windows
netstat -ano | findstr :5000

# Linux/Mac
lsof -i :5000
```

## 📚 Recursos

- [React Documentation](https://react.dev)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT](https://jwt.io)

## 📄 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

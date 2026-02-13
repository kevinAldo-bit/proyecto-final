# 🎮 PLATAFORMA GAMER 2.0 - MANUAL COMPLETO

## 📖 Tabla de Contenidos
1. [Características](#características)
2. [Guía de Uso](#guía-de-uso)
3. [API Endpoints](#api-endpoints)
4. [Sistema de Misiones](#sistema-de-misiones)
5. [Sistemas de Recompensas](#sistemas-de-recompensas)

---

## ✨ Características

### 🎨 Interfaz Cyberpunk
- **Tema Oscuro Profesional**: Fondo `#0d0d0d` con detalles neón
- **Colores Neon Dinámicos**:
  - Verde Neon `#00ff88` (Textos)
  - Cyan `#00ffff` (Bordes y glow)
  - Púrpura `#d500f9` (Acentos)
  - Rosa `#ff006e` (Acciones peligrosas)
- **Efectos Glow**: Todos los elementos tienen sombras neon
- **Animaciones Suaves**: Framer Motion en tarjetas y transiciones

### 🕹️ Sistema de Misiones
Las misiones reemplazan completamente el sistema de tareas antiguo:

```javascript
Misión {
  titulo: String,              // Nombre de la misión
  descripcion: String,         // Detalles
  estado: 4 opciones,         // aceptada, en progreso, completada, fracasada
  dificultad: 5 niveles,      // fácil, normal, difícil, épica, legendaria
  recompensaXP: 0-1000,       // Puntos de experiencia
  recompensaOro: 0-500,       // Moneda virtual
  genero: String,             // RPG, FPS, Estrategia, etc.
  plataforma: 5 opciones,     // PC, PS5, Xbox, Switch, Multiplataforma
  fechaVencimiento: Date,     // Deadline
  esBonus: Boolean,           // Misión especial
}
```

### 👤 Sistema de Jugador
Cada usuario ahora tiene estadísticas de jugador:

```javascript
Usuario {
  nombre: String,             // Nombre del jugador
  email: String,
  xp: Number,                 // Experiencia acumulada
  nivel: Number,              // Calculado: Math.floor(xp / 1000) + 1
  role: "jugador" | "admin",  // Tipo de cuenta
  plataforma: String,         // Preferencia (PC, PS5, etc.)
}
```

### 📊 Generador de Reportes PDF
Función especial para exportar batalla:

- **Datos incluidos**:
  - Nombre del jugador
  - XP total
  - Nivel actual
  - Misiones completadas (detalladas)
  - Total de XP ganado
  - Estadísticas generales

- **Nombre archivo**: `reporte-batalla-[nombre-jugador].pdf`
- **Estilo**: Profesional con colores temáticos

### 🎲 Dificultades de Misiones

| Dificultad | Color | XP Base | Oro Base |
|-----------|-------|---------|----------|
| 🟢 Fácil | Verde | 25-50 | 10-25 |
| 🔵 Normal | Azul | 50-100 | 25-50 |
| 🟠 Difícil | Naranja | 100-200 | 50-100 |
| 🟣 Épica | Púrpura | 200-500 | 100-250 |
| 🔴 Legendaria | Rojo | 500-1000 | 250-500 |

---

## 📱 Guía de Uso

### 1️⃣ Registro de Nuevo Jugador

```
1. Ir a http://localhost:5173
2. Click en "Regístrate aquí"
3. Completar:
   - Nombre de Jugador
   - Email válido
   - Contraseña (mín. 6 caracteres)
   - Confirmar contraseña
4. Click "✅ REGISTRARSE"
```

**Resultado**: Se crea cuenta y entra automáticamente al Dashboard

### 2️⃣ Login

```
1. Ir a http://localhost:5173/login
2. Ingresar:
   - Email
   - Contraseña
3. Click "🚀 INICIAR SESIÓN"
```

**Resultado**: Token guardado en localStorage, acceso a Dashboard

### 3️⃣ Crear Nueva Misión

En el Dashboard:
```
1. Click "➕ NUEVA MISIÓN"
2. Completar formulario:
   - TÍTULO (obligatorio)
   - DESCRIPCIÓN
   - ESTADO (4 opciones)
   - DIFICULTAD (5 niveles)
   - PLATAFORMA
   - GÉNERO
   - RECOMPENSA XP
   - RECOMPENSA ORO
   - DEADLINE (fecha opcional)
   - ¿BONUS? (checkbox)
3. Click "✅ CREAR MISIÓN"
```

**Validación**:
- Título no puede estar vacío
- XP y Oro deben ser números válidos
- Fecha debe ser válida si se ingresa

### 4️⃣ Editar Misión

```
1. En Dashboard, buscar la tarjeta de la misión
2. Click "✏️ EDITAR"
3. El formulario se abre con los datos actuales
4. Modificar lo necesario
5. Click "💾 GUARDAR CAMBIOS"
```

**Nota**: Si completas la misión, XP se suma automáticamente

### 5️⃣ Eliminar Misión

```
1. Buscar la tarjeta en el Dashboard
2. Click "🗑️ ELIMINAR"
3. Confirmar en el diálogo
```

**Atención**: No se puede deshacer

### 6️⃣ Generar Reporte PDF

```
1. Click "📊 REPORTE PDF" (arriba a la derecha)
2. Se descarga automáticamente
3. Nombre: reporte-batalla-[nombre].pdf
```

**Contenido del PDF**:
- Encabezado con título
- Datos del jugador
- Todas las misiones completadas
- Resumen de estadísticas

---

## 🔌 API Endpoints

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/registro
Content-Type: application/json

{
  "nombre": "MiNombreGamer",
  "email": "jugador@example.com",
  "password": "contraseña123"
}

Respuesta (201):
{
  "success": true,
  "mensaje": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "MiNombreGamer",
    "email": "jugador@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "jugador@example.com",
  "password": "contraseña123"
}

Respuesta (200):
{
  "success": true,
  "mensaje": "Sesión iniciada exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "MiNombreGamer",
    "email": "jugador@example.com"
  }
}
```

#### Obtener Perfil
```http
GET /api/auth/perfil
Authorization: Bearer <TOKEN>

Respuesta (200):
{
  "success": true,
  "usuario": {
    "id": "507f1f77bcf86cd799439011",
    "nombre": "MiNombreGamer",
    "email": "jugador@example.com"
  }
}
```

### Misiones

#### Obtener Todas las Misiones
```http
GET /api/misiones
Authorization: Bearer <TOKEN>

Respuesta (200):
{
  "success": true,
  "misiones": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "titulo": "Derrotar el dragón",
      "descripcion": "Misión épica de nivel final",
      "estado": "en progreso",
      "dificultad": "legendaria",
      "recompensaXP": 500,
      "recompensaOro": 250,
      ...
    }
  ]
}
```

#### Crear Nueva Misión
```http
POST /api/misiones
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "titulo": "Derrotar el dragón",
  "descripcion": "Misión épica de nivel final",
  "estado": "aceptada",
  "dificultad": "legendaria",
  "recompensaXP": 500,
  "recompensaOro": 250,
  "genero": "RPG Action",
  "plataforma": "PC",
  "esBonus": false
}

Respuesta (201):
{
  "success": true,
  "mensaje": "🎮 Misión creada exitosamente",
  "mision": { ... }
}
```

#### Actualizar Misión
```http
PUT /api/misiones/:id
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "titulo": "Derrotar el dragón (Actualizado)",
  "estado": "completada",
  ...
}

Respuesta (200):
{
  "success": true,
  "mensaje": "✅ Misión actualizada y XP asignado",
  "mision": { ... }
}
```

#### Eliminar Misión
```http
DELETE /api/misiones/:id
Authorization: Bearer <TOKEN>

Respuesta (200):
{
  "success": true,
  "mensaje": "🗑️ Misión eliminada exitosamente"
}
```

---

## 🎲 Sistema de Misiones

### Estados Disponibles

| Estado | Icono | Descripción |
|--------|-------|-------------|
| Aceptada | 📋 | Misión nuevo, sin empezar |
| En progreso | ⚔️ | Actualmente jugando |
| Completada | ✅ | Finalizada con éxito |
| Fracasada | ❌ | Falló o fue cancelada |

### Cambio de Estado
Cuando cambias una misión a "completada":
- ✅ XP se suma automáticamente
- ✅ Nivel se recalcula
- ✅ Los cambios se guardan en BD

### Estructura de Tarjeta de Misión

```
┌─────────────────────────────┐
│ 🎁 [Si es bonus]            │
│                             │
│ ⚔️ TÍTULO DE LA MISIÓN      │
│ Descripción breve...        │
│                             │
│ [🟣 ÉPICA] [PC]             │
│                             │
│ ┌─────────────────────────┐ │
│ │ ⚡ XP: 500     💰 ORO: 250 │
│ │ 📅 15/02/2026           │
│ └─────────────────────────┘ │
│                             │
│ [✏️ EDITAR] [🗑️ ELIMINAR]    │
└─────────────────────────────┘
```

---

## 🏆 Sistemas de Recompensas

### Sistema de XP
- **Ganancia**: Al completar misión
- **Cálculo**: Basado en dificultad
- **Nivel**: Se actualiza automáticamente
- **Fórmula**: `nivel = Math.floor(xp / 1000) + 1`

### Ejemplo de Progresión
```
Jugador comienza: 0 XP → Nivel 1
Completa misión fácil (+50 XP): 50 XP → Nivel 1
Completa misión épica (+200 XP): 250 XP → Nivel 1
Completa 10 misiones: 1000 XP → Nivel 2
Completa 20 misiones: 2000 XP → Nivel 3
```

### Sistema de Oro
- **Ganancia**: Al completar misión
- **Uso**: Futuro (para shop o upgrades)
- **No tiene límite**: Acumula indefinidamente

---

## 🔒 Seguridad

### Tokens JWT
- **Duración**: 7 días
- **Encriptación**: HS256
- **Header**: `Authorization: Bearer <TOKEN>`
- **Almacenamiento**: localStorage (cliente)

### Contraseñas
- **Encriptación**: bcryptjs (10 rounds)
- **Validación**: Mínimo 6 caracteres
- **Nunca en texto plano**: Especialmente en BD

### Protección de Rutas
- Dashboard requiere token válido
- Token expirado = redirige a login
- Cookies con credenciales = Habilitadas

---

## 🐛 Troubleshooting

### Error: "No hay token"
**Problema**: No has iniciado sesión
**Solución**: Ir a /login y registrarse o ingresar

### Error: "Token inválido o expirado"
**Problema**: Session venció después de 7 días
**Solución**: Hacer logout y volver a login

### Error: "Conexión rechazada a MongoDB"
**Problema**: Atlas está down o sin conexión
**Solución**: Verificar conexión, IP whitelist en Atlas

### Misiones no cargan
**Problema**: Backend no está corriendo
**Solución**: `cd backend && npm run dev`

### PDF no se descarga
**Problema**: Bloqueo de pop-ups o permisos
**Solución**: Permitir pop-ups en el navegador

---

## 📚 Recursos Adicionales

- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Framer Motion](https://www.framer.com/motion/)
- [jsPDF](https://github.com/parallax/jspdf)
- [JWT](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**¡Disfruta tu Plataforma Gamer! 🎮🚀**

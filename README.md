## Around The U.S. — Full Stack App
 - ¡Bienvenido/a al repositorio de Around The U.S.! Esta aplicación es el proyecto integrador del bootcamp Full Stack Web Development en TripleTen. Conecta un Frontend declarativo en React con un servidor Backend en Node.js/Express respaldado por MongoDB, e incluye manejo centralizado de errores, validaciones, registro de logs y despliegue en la nube.

*** Tabla de Contenidos ***
+ Sobre el Proyecto
+ Dominios
+ Arquitectura y Estructura
+ Tecnologías Utilizadas
+ Funcionalidades Principales
+ Seguridad y Buenas Prácticas
+ Despliegue e Infraestructura
+ Autora

### Sobre el Proyecto
Around The U.S. nació como una aplicación de red social interactiva en JS vanilla y evolucionó en un proyecto Full Stack completo dividido en dos partes principales:

Frontend (web_project_around_react): Refactorizado desde cero con React y Vite, transformando la manipulación manual del DOM en una arquitectura declarativa basada en componentes, hooks y contexto global.

Backend (web_project_around_express): Una API RESTful construida con Node.js, Express y MongoDB, encargada de gestionar usuarios, autenticación, autorización y tarjetas.

## Dominios
- Frontend: https://webproj.thepresenttraveller.com
- Frontend (www): https://www.webproj.thepresenttraveller.com
- API: https://api.webproj.thepresenttraveller.com

*** Arquitectura y Estructura ***
El repositorio conecta la interfaz de usuario con la API del servidor mediante una comunicación fluida:
Plaintext
[ Cliente (React + Vite) ] <---> [ API REST (Express + Node.js) ] <---> [ Base de Datos (MongoDB) ]

🛠 Tecnologías Utilizadas
- Frontend
React & Vite: Librería de UI basada en componentes y entorno de desarrollo ultra rápido.
React Router: Enrutamiento dinámico y protección de vistas mediante ProtectedRoute.
React Hooks: useState, useEffect y useContext (para evitar prop drilling compartiendo la información del usuario actual).
JSX & CSS (BEM): Markup declarativo y estilos estructurados en bloques, responsivos para dispositivos móviles.

- Backend
Node.js & Express 5.x: Entorno de ejecución y framework web para construir los endpoints RESTful.
MongoDB & Mongoose: Persistencia de datos mediante esquemas y modelos para User y Card.
Celebrate & Joi: Middleware de validación de solicitudes HTTP antes de llegar a los controladores.
Winston: Sistema de registro (logging) para registrar peticiones y errores en archivos independientes.
JWT (JSON Web Tokens): Autenticación y autorización basada en tokens.
ESLint (Airbnb): Control de calidad de código y adherencia a estándares profesionales.

✨ Funcionalidades Principales
Autenticación y Seguridad
Registro (/signup) e inicio de sesión (/signin) con hashing de contraseñas.
Rutas protegidas en React: solo usuarios autenticados acceden al feed principal.
Persistencia de sesión mediante almacenamiento del JWT en localStorage.
Gestión de Perfil y Tarjetas
Edición de perfil de usuario (nombre, ocupación) y actualización de avatar en tiempo real.
Creación, eliminación y funcional idad de "me gusta" / "quitar me gusta" en tarjetas, sincronizadas directamente con la base de datos MongoDB.
Manejo de Errores y Robustez
Manejo centralizado de errores: Respuestas JSON estructuradas según el tipo de fallo (400, 401, 403, 404, 500).
Validación con Mongoose: Uso de orFail, ValidationError y CastError para peticiones consistentes.

🔒 Sobre Seguridad
Actualmente, el token JWT se almacena en localStorage para facilitar la gestión de sesión en esta fase del desarrollo. Una mejora planificada a futuro es migrar la entrega de tokens a cookies httpOnly y Secure para mitigar vulnerabilidades de exposición ante ataques XSS.

🚀 Instalación y Configuración
Prerrequisitos
Node.js (v18 o superior)
MongoDB instalado de manera local o una instancia activa en MongoDB Atlas.

1. Configuración del Backend
Bash
# Clonar el proyecto e ingresar al directorio backend
cd web_project_around_express
# Instalar dependencias
npm install
# Iniciar servidor en modo desarrollo (Nodemon)
npm run dev
Comandos Backend:
npm run start — Inicia el servidor con Node.js en puerto 3000 (o el definidien .env).
npm run dev — Inicia el servidor con reloaded automático mediante Nodemon.
npm run lint — Ejecuta ESLint para verificar estándares de código.

2. Configuración del Frontend
Bash
# Ingresar al directorio frontend
cd web_project_around_react

# Instalar dependencias
npm install

# Iniciar entorno de desarrollo
npm run dev
☁️ Despliegue e Infraestructura
Como paso final de preculminación:
Google Cloud Platform (GCP): Despliegue del servidor Backend y la base de datos en una Máquina Virtual (VM).
Dominio Personalizado: Configuración de nombre de dominio propio y certificados SSL/TLS para peticiones HTTPS seguras.

*** Autora ***
María Mendoza (2026)
Desarrolladora Web Full Stack en TripleTen.
Proyecto Integrador de Preculminación.

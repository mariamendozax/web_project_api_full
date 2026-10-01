# Tripleten web_project_around_express

**_ Web Project Around Express _**

# Backend

API backend para el proyecto Web Project Around, construida con Node.js y Express. Actualmente utiliza MongoDB (a través de Mongoose) para la persistencia de datos de usuarios y tarjetas, expuestos mediante un conjunto de endpoints RESTful.

## Descripción

Este proyecto es el entregable de backend del bootcamp de TripleTen y ha evolucionado a lo largo de varios sprints:

- **Sprints (16):** El servidor se construyó en Express, sirviendo datos de prueba de usuarios y tarjetas desde archivos JSON locales, devueltos a través de endpoints RESTful. Esta etapa sentó las bases del servidor y la estructura de rutas.
- **Sprint 17:** Se integró una base de datos real con MongoDB, definiendo los esquemas y modelos de Mongoose para `user` y `card`, reemplazando los archivos JSON estáticos por persistencia real.
- Se está reforzando el manejo de errores en los controladores (`getUser`, `createUser`, `getUsers`), utilizando `orFail`, `ValidationError` y `CastError` para devolver respuestas más robustas y predecibles al cliente.

# Tecnologías utilizadas:

- Node.js
- Express 5.x
- ESLint con configuración base de Airbnb
- Nodemon para desarrollo

**_ Comandos disponibles _**
Comando Descripción
npm run start Inicia el servidor con Node.js
npm run dev Inicia el servidor con Nodemon (se reinicia automáticamente con cada cambio)
npm run lint Corre ESLint para revisar el estilo del código

El servidor corre en http://localhost:3000 por defecto, o en el puerto definido en la variable de entorno PORT.

# Implementando MongoDB: Base de datos.

- Conexión del servidor a una base de datos MongoDB.
- Creación de los esquemas y modelos de `User` y `Card`.
- Implementación de los controladores para las operaciones CRUD de usuarios y tarjetas.
- Manejo de errores: validación de datos (400), recursos no encontrados (404) y errores del servidor (500).
- Rutas para dar like/unlike a las tarjetas y actualizar el perfil/avatar del usuario.

**_ Maria Mendoza 2026_**

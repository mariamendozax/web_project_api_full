# web_project_around_react

## Sobre el proyecto

**web_project_around_react** es un refactor del proyecto original en JavaScript vanilla "Alrededor de los EE.UU.", reconstruido desde cero usando React y Vite. La lógica y estructura del proyecto original fueron completamente desestructuradas y reorganizadas en componentes reutilizables de React, reemplazando la manipulación manual del DOM por una arquitectura declarativa basada en componentes.

## Tecnologías utilizadas

- **React** — Librería de UI basada en componentes, usada para reconstruir toda la estructura de la app
- **Vite** — Herramienta de build rápida y servidor de desarrollo para el proyecto de React
- **React Router** — para manejo de rutas y rutas protegidas (`ProtectedRoute`)
- **React Hooks**
  - `useState` — para manejar el estado local de componentes (formularios, modales, tarjetas, etc.)
  - `useEffect` — para manejar efectos secundarios como la obtención de datos, verificación de sesión y actualizaciones relacionadas al DOM
  - `useContext` — para compartir estado global (como los datos del usuario actual) entre componentes sin necesidad de _prop drilling_
- **Integración con API REST** — conexión a un servidor backend para obtener y persistir datos del usuario, perfil y tarjetas (`src/utils/api.js`)
- **Autenticación con JWT** — registro e inicio de sesión conectados a un servicio de autenticación externo (`src/utils/auth.js`), con persistencia de sesión vía `localStorage`
- **JSX** — para escribir el markup de la UI de forma declarativa
- **CSS** — estilo de los componentes (estructura basada en bloques BEM heredada del proyecto original), con media queries para diseño responsivo

## Funcionalidades principales

- Estructura totalmente componentizada (`Header`, `Main`, `Footer`, `PopupWithForm`, `ImagePopup`, `Card`, etc.)
- **Registro e inicio de sesión de usuarios**, con validación de credenciales y manejo de errores por código de estado
- **Rutas protegidas**: solo usuarios autenticados pueden acceder al contenido principal de la app
- **Persistencia de sesión**: el token se guarda en `localStorage` y se verifica automáticamente al recargar la página
- Edición del perfil de usuario y actualización de avatar conectadas a una API en vivo
- Creación, eliminación y "me gusta" de tarjetas sincronizadas con el servidor
- Contexto global de usuario para evitar el _prop drilling_ entre componentes anidados
- **Diseño responsivo**: la interfaz se adapta a dispositivos móviles, incluyendo ajustes específicos en popups y modales para pantallas pequeñas

## Sobre seguridad

Este proyecto usa `localStorage` para persistir el JWT durante la sesión. Es una solución funcional para este nivel del bootcamp, aunque una mejora futura sería mover el token a una cookie `httpOnly` para reducir el riesgo de exposición ante ataques XSS — tema que se cubre en sprints posteriores del programa.

---

**_María — Estudiante de Desarrollo Web Full Stack en TripleTen._**

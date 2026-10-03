import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formData);
  }

  return (
    <div className="auth__container">
      <h1 className="auth__title">Iniciar sesión</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="auth__input"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="auth__input"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <button type="submit" className="auth__button">
          Iniciar sesión
        </button>
        <Link to="/signup" className="auth__link">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
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
    onRegister(formData);
  }

  return (
    <div className="auth__container">
      <h1 className="auth__title">Regístrate</h1>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
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
          autoComplete="new-password"
          minLength={8}
          required
        />
        <button type="submit" className="auth__button">
          Regístrate
        </button>
        <Link to="/signin" className="auth__link">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
    </div>
  );
}

export default Register;

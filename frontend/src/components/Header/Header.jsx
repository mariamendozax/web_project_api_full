import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

function Header({ loggedIn, onSignOut, userEmail }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header page__section">
      {loggedIn && (
        <div
          className={`header__menu ${isMenuOpen ? "header__menu_opened" : ""}`}
        >
          {userEmail && <span className="header__email">{userEmail}</span>}
          <button
            onClick={onSignOut}
            className="header__button header__button_type_logout"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      <div className="header__container">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />
        {loggedIn ? (
          <>
            <div className="header__user">
              {userEmail && <span className="header__email">{userEmail}</span>}
              <button onClick={onSignOut} className="header__button">
                Cerrar sesión
              </button>
            </div>
            <button
              type="button"
              className={`header__hamburger ${isMenuOpen ? "header__hamburger_active" : ""}`}
              onClick={toggleMenu}
              aria-label="Abrir menú"
            />
          </>
        ) : location.pathname === "/signin" ? (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        ) : (
          <Link to="/signin" className="header__link">
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

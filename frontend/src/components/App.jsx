import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";
import Login from "./Login/Login";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [popup, setPopup] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  function handleRegistration({ email, password }) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        if (err.status === 400) {
          setErrorMessage("Uno de los campos se llenó de forma incorrecta");
        } else if (err.status === 409) {
          setErrorMessage("Ese correo ya está registrado");
        } else {
          setErrorMessage("Ocurrió un error, intenta de nuevo");
        }
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);
          setUserEmail(email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        if (err.status === 400) {
          setErrorMessage("No se proporcionó uno o más campos");
        } else if (err.status === 401) {
          setErrorMessage("Correo o contraseña incorrectos");
        } else {
          setErrorMessage("Ocurrió un error, intenta de nuevo");
        }
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
    setIsInfoTooltipOpen(false);
    setErrorMessage("");
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setToken(jwt);
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
          setToken("");
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .setUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((err) => console.log(err));
    })();
  };

  const handleUpdateAvatar = (data) => {
    api
      .editProfilePicture(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  //Cards
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((error) => {
        setPopup(null);
        setErrorMessage(error.message);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        onUpdateAvatar: handleUpdateAvatar,
        isLoggedIn: loggedIn,
      }}
    >
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          userEmail={userEmail}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <Main
                    cards={cards}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute anonymous>
                <Register onRegister={handleRegistration} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute anonymous>
                <Login onLogin={handleLogin} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
          onClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

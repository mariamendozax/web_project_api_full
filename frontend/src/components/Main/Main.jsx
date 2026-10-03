import { useContext } from "react";
import NewCard from "../NewCard/NewCard.jsx";
import Popup from "./Popup/Popup.jsx";
import EditAvatar from "../Avatar/EditAvatar.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  popup,
  onOpenPopup,
  onClosePopup,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <button
            className="profile__avatar-edit-button"
            aria-label="Cambiar foto de perfil"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              aria-label="Editar perfil"
              className="profile__edit-button"
              type="button"
              onClick={() => onOpenPopup(editProfilePopup)}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";

export default function Card(props) {
  const { name, link, likes } = props.card;
  const { onOpenPopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const imagePopup = {
    children: <ImagePopup card={props.card} />,
  };

  const isLiked = likes.includes(currentUser._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(props.card, isLiked);
  }

  function handleDeleteClick() {
    onOpenPopup({
      title: "¿Estás seguro?",
      children: <RemoveCard card={props.card} onCardDelete={onCardDelete} />,
    });
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => onOpenPopup(imagePopup)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        >
        </button>
        <span className="card__like-count">{likes.length}</span>
      </div>
      </div>
    </li>
  );
}

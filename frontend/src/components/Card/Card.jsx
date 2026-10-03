import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { onOpenPopup, onCardLike, onCardDelete } = props;
  const imagePopup = {
    children: <ImagePopup card={props.card} />,
  };
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;
  function handleLikeClick() {
    onCardLike(props.card);
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
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

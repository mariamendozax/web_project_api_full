export default function RemoveCard({ card, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <button className="button popup__button" type="submit">
        Sí
      </button>
    </form>
  );
}

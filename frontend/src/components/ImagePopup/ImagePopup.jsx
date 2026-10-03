export default function ImagePopup(props) {
  const { card } = props;
  return (
    <>
      <img alt={card.name} className="popup__image" src={card.link} />
      <p className="popup__caption">{card.name}</p>
    </>
  );
}

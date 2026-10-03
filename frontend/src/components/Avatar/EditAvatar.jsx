import { useRef, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarInputRef = useRef();
  const { onUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatar-url"
        name="avatar"
        placeholder="Enlace a la imagen"
        type="url"
        required
        ref={avatarInputRef}
      />
      <span className="avatar-url-input-error popup__input-error"></span>
      <button className="popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}

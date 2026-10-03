import Popup from "../Main/Popup/Popup";
import successIcon from "../../images/successIcon.png";
import errorIcon from "../../images/errorIcon.png";

export default function InfoTooltip({
  isOpen,
  onClose,
  isSuccess,
  errorMessage,
}) {
  if (!isOpen) return null;

  return (
    <Popup onClose={onClose}>
      <div className="popup__content popup__info">
        <img
          className="popup__icon"
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Registro exitoso" : "Error en el registro"}
        />
        <p className="popup__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : errorMessage ||
              "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </Popup>
  );
}

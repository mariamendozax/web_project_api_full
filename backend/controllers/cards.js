const Card = require("../models/card");
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE_CREATED,
} = require("../utils/statusCode");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() =>
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" }),
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(SUCCESS_CODE_CREATED).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "Datos inválidos" });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Error en el servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const error = new Error("No tienes permiso para eliminar esta tarjeta");
        error.statusCode = 403;
        throw error;
      }
      return card
        .deleteOne()
        .then(() => res.send({ message: "Tarjeta eliminada" }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "ID de tarjeta no válido" });
      }
      if (err.statusCode === 403) {
        return res.status(403).send({ message: err.message });
      }
      if (err.statusCode === 404) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Error en el servidor" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "ID de tarjeta no válido" });
      }
      if (err.statusCode === 404) {
        return res
          .status(ERROR_CODE_NOT_FOUND)
          .send({ message: "Usuario no encontrado" });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Error en el servidor" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "ID de tarjeta no válido" });
      }
      if (err.statusCode === 404) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Error en el servidor" });
    });
};

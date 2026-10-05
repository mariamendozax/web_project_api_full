const Card = require('../models/card');
const { SUCCESS_CODE_CREATED } = require('../utils/statusCode');
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require('../utils/error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(SUCCESS_CODE_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Datos de tarjeta no válidos'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Tarjeta no encontrada'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          'No tienes permiso para eliminar esta tarjeta',
        );
      }
      return card
        .deleteOne()
        .then(() => res.send({ message: 'Tarjeta eliminada' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('ID de tarjeta no válido'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: 'after' },
  )
    .orFail(() => new NotFoundError('Tarjeta no encontrada'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('ID de tarjeta no válido'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { returnDocument: 'after' },
  )
    .orFail(() => new NotFoundError('Tarjeta no encontrada'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('ID de tarjeta no válido'));
      }
      return next(err);
    });
};

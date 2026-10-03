const User = require("../models/user");
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE_CREATED,
} = require("../utils/statusCode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Correo o contraseña incorrectos");
        error.statusCode = 401;
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Correo o contraseña incorrectos");
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        return res.status(401).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" }),
    );
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "ID de usuario no válido" });
      }
      if (err.statusCode === 404) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      return res.status(SUCCESS_CODE_CREATED).send(userData);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "Datos inválidos" });
      }
      if (err.code === 11000) {
        return res
          .status(409)
          .send({ message: "Ya existe un usuario con ese correo" });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "Datos inválidos" });
      }
      if (err.statusCode === 404) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(ERROR_CODE_BAD_REQUEST)
          .send({ message: "Datos inválidos" });
      }
      if (err.statusCode === 404) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_CODE_DEFAULT)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

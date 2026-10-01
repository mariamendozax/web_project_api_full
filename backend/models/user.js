const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return URL_REGEX.test(value);
      },
      message: 'El enlace del avatar no es válido',
    },
  },
});

module.exports = mongoose.model('user', userSchema);

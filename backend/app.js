require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./utils/error');
const { validateLogin, validateSignup } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar a la base de datos', err));

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateSignup, createUser);

app.use(auth);

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Recurso solicitado no encontrado'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

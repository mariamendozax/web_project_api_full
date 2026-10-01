const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar a la base de datos', err));

app.use(express.json());
app.use((req, res, next) => { /// Solución temporal para simular un usuario autenticado
  req.user = { _id: '6aa8537d574dc6a0a02c5088' };
  next();
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

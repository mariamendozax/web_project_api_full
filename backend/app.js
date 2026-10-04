const express = require("express");
const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { PORT = 3000 } = process.env;
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const { NotFoundError } = require("./utils/error");

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos", err));

app.use(express.json());
app.use(cors());
app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Recurso solicitado no encontrado"));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

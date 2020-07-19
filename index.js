const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("db connected..."))
  .catch((err) => console.error("couldn't connect to MongoDb"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get("env") === "development") {
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
}
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

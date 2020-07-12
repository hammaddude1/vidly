const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const customers = require("./routes/customers");
const genres = require("./routes/genres");
const home = require("./routes/home");
const app = express();

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
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

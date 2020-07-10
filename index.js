const morgan = require("morgan");
const express = require("express");
const genres = require("./routes/genres");
const home = require("./routes/home");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get("env") === "development") {
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
}

app.use("/api/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

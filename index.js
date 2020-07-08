const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "horror" },
  { id: 2, name: "action" },
  { id: 3, name: "sports" },
];

app.get("/", (req, res) => {
  res.send("use the desired api call to get, post, delete or update data");
});

app.get("/api/genres", (req, res) => {
  if (!genres) return res.status(404).send("nothing available to send");
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(400).send("not found");
  res.send(genre);
});

app.post("/api/genres/", (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  //genre does not exist
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found");

  //validation error
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validation(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

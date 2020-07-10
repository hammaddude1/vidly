const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("use the desired api call to get, post, delete or update data");
});
module.exports = router;

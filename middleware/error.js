const winston = require("winston");
const { error } = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.message, { metadata: err });
  res.status(500).send("Unexpected Error Occured");
};

const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  const logger = winston.createLogger({
    level: "info",
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
    ],
  });

  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "vidly.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "vidly.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      handleExceptions: true,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      level: "error",
    })
  );
};

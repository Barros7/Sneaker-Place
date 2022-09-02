import bodyParser from "body-parser";
import express from "express";
import logging from "./config/logging.js";
import config from "./config/config.js";
import authentication from "./routes/authentication.js";

const NAMESPACE = "Server";
const server = express();

server.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the body of the request */
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/** Rules of the server */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Available http methods
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */
server.use("/auth", authentication);

/** Error handling */
server.use((_, res, _2) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

/** Server Listening**/
server.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  );
});

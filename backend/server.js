import bodyParser from "body-parser";
import express from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import logging from "./config/logging.js";
import config from "./config/config.js";
import authentication from "./routes/authentication.js";
import sneakerRoute from "./routes/sneakers.js";
import orderRoute from "./routes/sneaker-orders.js";
import salesRoute from "./routes/sneaker-sales.js";
import sneakerModelsRoute from "./routes/sneaker-models.js";
import Utils from "./utils.js";

const NAMESPACE = "Server";
const server = express();
const UtilsInstance = new Utils(NAMESPACE);
// UtilsInstance.loadTables();

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
    return res.status(StatusCodes.OK).json({});
  }

  next();
});

// jwt auth
server.use((req, res, next) => {
  const regexPattern = /auth/i;
  // do not need auth
  if (regexPattern.test(req.url)) next();

  // needs auth
  logging.info(
    NAMESPACE,
    "This Route needs Authorization"
  );
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED);

  jwt.verify(token, config.token.value, (err, payload) => {
    logging.error(NAMESPACE, err);

    if (err) return sres.sendStatus(StatusCodes.FORBIDDEN);

    logging.info(NAMESPACE, "The request is Legit");
    req.jwt = payload;

    next();
  });
});

/** Routes go here */
server.use("/auth", authentication);
server.use("/sneaker", sneakerRoute);
server.use("/sneakerModel", sneakerModelsRoute);
server.use("/order", orderRoute);
server.use("/sales", salesRoute);


/** Error handling */
server.use((_, res, _2) => {
  const error = new Error("Not found");

  res.status(StatusCodes.NOT_FOUND).json({
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

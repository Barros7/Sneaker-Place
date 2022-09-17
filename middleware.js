import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import logging from "./config/logging.js";
import config from "./config/config.js";

const NAMESPACE = "Server";

export function jwtAuth(req, res, next) {
  // needs auth
  logging.info(NAMESPACE, "This Route needs Authentication");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.sendStatus(StatusCodes.UNAUTHORIZED).json({
      message: "This Route needs Authentication",
    });

  jwt.verify(token, config.token.value, (err, payload) => {
    logging.error(NAMESPACE, err);

    if (err)
      return res.sendStatus(StatusCodes.FORBIDDEN).json({
        err,
      });

    logging.info(NAMESPACE, "The request is Legit");
    req.jwt = payload;

    next();
  });
}

export function serverStatus(req, res, next) {
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
}
export function serverRules(req, res, next) {
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
}

export function errorHandler(_, res, _2) {
  const error = new Error("Not found");

  res.status(StatusCodes.NOT_FOUND).json({
    message: error.message,
  });
  res.end();
}

export function validateRequestBody(req, res, next) {
  console.log(req.body)

  if (!req.body || Object.keys(req.body).length == 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "The body is empty but is required",
    });
  }
  next();
}

export function validateDataIntegrity(req, res, next) {
  console.log(req.body)

  let valid = true;
  let invalidFields = [];
  Object.keys(req.body).forEach((key) => {
    if (!req.body[key]) {
      invalidFields.push(key);
      valid = false;
    }
  });

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: `This fields are empty ${invalidFields}`,
    });
  }
  next();
}

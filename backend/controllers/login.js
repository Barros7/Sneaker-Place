import { ReasonPhrases, StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import config from "./../config/config.js";
import Utils from "../utils.js";

const NAMESPACE = "login";
const UtilsInstance = new Utils(NAMESPACE);

export function createUser(req, res) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
  const user = req.body;
  logging.info(NAMESPACE, `Creating new User with name:${user.Name}`);
  let invalid = false;
  Object.keys(user).forEach((key) => {
    if (!user[key]) {
      invalid = true;
    }
  });

  if (invalid) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `INSERT INTO Users values (
    ${user.Password},
    ${user.Email},
    ${user.Name},
    ${user.Rule},
    ${user.City},
    ${user.Country},
    ${user.Postal_code},
    ${user.Street},
    ${user.Floor},
    ${user.Door},
  )`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "User successfully created", result);
        return res.status(200).json({
          result,
          userToken: UtilsInstance.generateAccessToken(user.name),
        });
      })
      .catch((error) => {
        return UtilsInstance.defaultError(error, res);
      })
      .finally(() => {
        UtilsInstance.closeDb(connection);
      });
  });
}

export function login(req, res) {
  if (!req.body || Object.keys(req.body).length === 0 || !req.body.name) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `SELECT * Users WHERE name = ${req.body.name}`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Getting the User", result);

        return res.status(200).json({
          result,
          userToken: UtilsInstance.generateAccessToken(req.body.name),
        });
      })
      .catch((error) => {
        return UtilsInstance.defaultError(error, res);
      })
      .finally(() => {
        UtilsInstance.closeDb(connection);
      });
  });
}

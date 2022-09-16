import { Connect, Query } from "./config/mysql.js";
import logging from "./config/logging.js";
import { StatusCodes } from "http-status-codes";
import config from "./config/config.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const MULTIPLE_QUERIES = true;
const INITIAL_QUERIES_PATH = "./metadata/init.sql";

export default class Utils {
  constructor(namespace) {
    this.namespace = namespace;
  }

  generateAccessToken(username) {
    console.log(typeof config.token.expiration);
    return jwt.sign({ username }, config.token.value, {
      expiresIn: config.token.expiration,
    });
  }

  loadTables() {
    const queries = fs
      .readFileSync(INITIAL_QUERIES_PATH)
      .toString()
      .replace(/(\r\n|\n|\r)/gm, "");
    Connect(MULTIPLE_QUERIES).then((connection) => {
      Query(connection, queries)
        .then(() => {
          logging.info(this.namespace, "Tables Loaded");
        })
        .catch((error) => {
          logging.error(this.namespace, error.message, error);
        })
        .finally(() => {
          logging.info(this.namespace, "Closing connection.");
          connection.end();
        });
    });
  }

  defaultError(error, response) {
    logging.error(this.namespace, error.message, error);
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
  closeDb(connection) {
    logging.info(this.namespace, "Closing connection.");
    connection.end();
  }
}

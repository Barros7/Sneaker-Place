import { ReasonPhrases, StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "Order";
const UtilsInstance = new Utils(NAMESPACE);

async function create(req, res) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `INSERT INTO Orders values (
    ${req.body.Order_date},
    ${req.body.Order_time},
    ${req.body.Users_id},
    ${req.body.Sneaker_id},
    )`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, `${NAMESPACE} successfully created`, result);
        return res.status(StatusCodes.OK).json({
          result,
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
async function get(req, res) {
  if (
    !req.body ||
    Object.keys(req.body).length === 0 ||
    !req.body.Users_id ||
    !req.body.Sneaker_id
  ) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `SELECT * Orders WHERE Users_id = ${req.body.Users_id} AND Sneaker_id = ${req.body.Sneaker_id}`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Getting the User Order", result);

        return res.status(StatusCodes.OK).json({
          result,
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

export default {
  create,
  get,
};

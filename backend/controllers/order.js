import { ReasonPhrases, StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "Order";
const UtilsInstance = new Utils(NAMESPACE);

async function create(req, res) {

  const query = `INSERT INTO Orders (Order_date,Order_date,Users_id,Sneaker_id) VALUES (
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

async function getAll(_, res) {
  const query = "SELECT * FROM Orders";

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Getting All the Data", result);

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
  
  const query = `SELECT * FROM Orders WHERE Users_id = ${req.body.Users_id} AND Sneaker_id = ${req.body.Sneaker_id}`;

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
  getAll
};

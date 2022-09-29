import { StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "Sales";
const UtilsInstance = new Utils(NAMESPACE);

async function create(req, res) {
  const query = `INSERT INTO Sales (Sneaker_id, Users_id, Price) VALUES (
    ${req.body.Sneaker_id},
    ${req.body.Users_id},
    ${req.body.Price}
    )`;

  Connect().then((connection) => {
    Query(connection, query.replace(/(\r\n|\n|\r)/gm, ""))
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
  const query1 = "SELECT * FROM Sales";

  const query = `SELECT 
  Sneakers.Name, Sneakers.Brand,
  Users.Email,
  Sales.Price
      FROM Sneakers 
      JOIN Sales
      ON Sneakers.Sneaker_id = Sales.Sneaker_id
      JOIN Users
      ON Users.Users_id = Sales.Users_id
  ORDER BY Sneakers.Sneaker_id;`;

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

  const query = `SELECT * FROM Sales WHERE Users_id = ${req.body.Users_id} AND Sneaker_id = ${req.body.Sneaker_id}`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Getting the Sneaker Model", result);

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
  getAll,
};

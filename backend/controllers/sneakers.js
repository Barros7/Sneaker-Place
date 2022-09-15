import { ReasonPhrases, StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "Sneakers";
const UtilsInstance = new Utils(NAMESPACE);

async function create(req, res) {
  console.log(req.body);
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `INSERT INTO Sneakers values (
    ${req.body.id},
    ${req.body.brand},
    ${req.body.size},
    ${req.body.color},
    ${req.body.name},
    ${req.body.description},
    ${req.body.model_id},
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
  if (!req.body || Object.keys(req.body).length === 0 || !req.body.id) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `SELECT * Sneakers WHERE Sneaker_id = ${req.body.id}`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Getting the Data", result);

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

async function update(req, res) {
  if (!req.body || Object.keys(req.body).length === 0 || !req.body.id) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  let query = "UPDATE Sneakers SET ";

  const keys = Object.keys(req.body);
  keys.forEach((key, index) => {
    if (key == "id") return;
    if (index == keys.length - 1) {
      query += `${key} = ${req.body[key]}`;
      return;
    }
    query.concat(`${key} = ${req.body[key]}`, ", ");
  });

  query += `WHERE Sneaker_id = ${req.body.id}`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Updating the data", result);

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

async function remove(req, res) {
  if (!req.body || Object.keys(req.body).length === 0 || !req.body.id) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }

  const query = `DELETE FROM Sneakers WHERE Sneaker_id = ${req.body.id}`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Deleting the data", result);

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
  remove,
  update,
  get,
};

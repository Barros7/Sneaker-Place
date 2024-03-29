import { StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "Sneaker Model";
const UtilsInstance = new Utils(NAMESPACE);

async function create(req, res) {
  const query = `INSERT INTO SneakerModels (Model) VALUES (
    "${req.body.Model}"
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

async function getAll(req, res) {
  const query = "SELECT * FROM SneakerModels";

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
  const query = `SELECT * FROM SneakerModels WHERE Model_id = ${req.body.Model_id}`;

  Connect().then((connection) => {
    Query(connection, query.replace(/(\r\n|\n|\r)/gm, ""))
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

async function update(req, res) {
  let query = "UPDATE SneakerModels SET ";

  const keys = Object.keys(req.body);
  keys.forEach((key, index) => {
    if (key == "Model_id") return;
    if (index == keys.length - 1) {
      query += `${key} = "${req.body[key]}"`;
      return;
    }
    query.concat(`${key} = "${req.body[key]}"`, ", ");
  });

  query += ` WHERE Model_id = ${req.body.Model_id}`;

  Connect().then((connection) => {
    Query(connection, query.replace(/(\r\n|\n|\r)/gm, ""))
      .then((result) => {
        logging.info(NAMESPACE, "Updating the Sneaker Model", result);

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
  update,
  get,
  getAll,
};

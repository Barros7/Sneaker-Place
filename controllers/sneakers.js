import { StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "Sneakers";
const UtilsInstance = new Utils(NAMESPACE);

async function create(req, res) {
  const query = `INSERT INTO Sneakers (Brand,Price,Size,Color,Name,Model_id,Description) VALUES (
    "${req.body.Brand}",
    ${req.body.Price},
    ${req.body.Size},
    "${req.body.Color}",
    "${req.body.Name}",
    ${req.body.Model_id},
    "${req.body.Description}"
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

async function get(req, res) {
  const query = `SELECT * FROM Sneakers WHERE Sneaker_id = ${req.body.Sneaker_id}`;

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
async function getAll(_, res) {
  const query = "SELECT * FROM Sneakers";

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

async function update(req, res) {
  let query = "UPDATE Sneakers SET ";

  const keys = Object.keys(req.body);
  keys.forEach((key, index) => {
    console.log(query);
    if (key == "Sneaker_id") return;
    if (typeof req.body[key] === "string") {
      if (index == keys.length - 1) {
        query += `${key} = "${req.body[key]}"`;
        return;
      }
      query += `${key} = "${req.body[key]}" ,`;
    } else {
      if (index == keys.length - 1) {
        query += `${key} = ${req.body[key]}`;
        return;
      }
      query += `${key} = ${req.body[key]} ,`;
    }
  });

  query += ` WHERE Sneaker_id = ${req.body.Sneaker_id}`;

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
  const query = `DELETE FROM Sneakers WHERE Sneaker_id = ${req.body.Sneaker_id}`;

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
  getAll,
  get,
};

import { StatusCodes } from "http-status-codes";
import logging from "../config/logging.js";
import { Connect, Query } from "../config/mysql.js";
import Utils from "../utils.js";

const NAMESPACE = "login";
const UtilsInstance = new Utils(NAMESPACE);

export async function updateUser(req, res) {
  let query = "UPDATE Users SET ";

  const keys = Object.keys(req.body);
  keys.forEach((key, index) => {
    if (key == "Users_id" || req.body[key] == "") return;
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

  query += ` WHERE Users_id = ${req.body.Users_id}`;

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

export function createUser(req, res) {
  if (Object.keys(req.body).length < 10) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message:"Invalid number of fields needs 10",
    });
  }
  const user = req.body;
  logging.info(NAMESPACE, `Creating new User with name:${user.Name}`);

  const query = `INSERT INTO Users (Password,Email,Name, Last_Name, Role, City, Country, Postal_code, Street, Floor, Door ) VALUES (
    "${user.Password}",
    "${user.Email}",
    "${user.Name}",
    "${user.Last_Name}",
    "${user.Role}",
    "${user.City}",
    "${user.Country}",
    "${user.Postal_code}",
    "${user.Street}",
    ${user.Floor},
    ${user.Door}
  );`;

  Connect().then((connection) => {
    Query(connection, query.replace(/(\r\n|\n|\r)/gm, ""))
      .then((result) => {
        logging.info(NAMESPACE, "User successfully created ", result);
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

export function login(req, res) {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email not Specified",
    });
  }

  const query = `SELECT * FROM Users WHERE Email = '${req.body.Email}'`;

  Connect().then((connection) => {
    Query(connection, query)
      .then((result) => {
        logging.info(NAMESPACE, "Getting the User", result);
        if (!result  || result.length === 0 || result[0].Password !== Password ) return res.status(StatusCodes.NOT_FOUND).json({
          message:"User not found"
        });

        const userToken = UtilsInstance.generateAccessToken(req.body.Email);
        res.set("x-access-token", userToken);
        return res.status(StatusCodes.OK).json({
          result,
          userToken,
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

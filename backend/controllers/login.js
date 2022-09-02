import logging from "../config/logging.js";
const NAMESPACE = "test";

function login(req, res) {
  logging.info(NAMESPACE, "test");
  return res.status(200).json({
    message: "login",
  });
}

export default login;

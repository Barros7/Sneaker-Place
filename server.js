import bodyParser from "body-parser";
import express from "express";
import logging from "./config/logging.js";
import config from "./config/config.js";
import authentication from "./routes/authentication.js";
import sneakerRoute from "./routes/sneakers.js";
import orderRoute from "./routes/sneaker-orders.js";
import salesRoute from "./routes/sneaker-sales.js";
import sneakerModelsRoute from "./routes/sneaker-models.js";
import cors from "cors";

/* ============= */
/* ============= */
/* ============= */
/* ============= */

const port = process.env.PORT || 9877;
let host = 'http://localhost';

/* ============= */
/* ============= */
/* ============= */
/* ============= */

import Utils from "./utils.js";
import {
  errorHandler,
  serverRules,
  jwtAuth,
  serverStatus,
  validateRequestBody,
  validateDataIntegrity,
} from "./middleware.js";

const NAMESPACE = "Server";
const server = express();
const UtilsInstance = new Utils(NAMESPACE);
UtilsInstance.loadTables();

server.use(serverStatus);

/** Parse the body of the request */
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/** Rules of the server */
//server.use(serverRules);

server.use(cors());

/** Routes go here */
server.use("/auth", authentication);
server.use("/sneaker", sneakerRoute);
server.use("/sneakerModel", sneakerModelsRoute);
server.use("/order", jwtAuth, orderRoute);
server.use("/sales", jwtAuth, salesRoute);

/** Error handling */
server.use(errorHandler);

/** Server Listening**/

server.listen(port, () => {
  logging.info(
    NAMESPACE,
    `Server is running ${host}:${port}`
  );
});

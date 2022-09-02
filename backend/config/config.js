import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_HOST;
const MYSQL_PASS = process.env.MYSQL_HOST;

const config = {
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
  },
  mysql: {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS,
  },
};

export default config;

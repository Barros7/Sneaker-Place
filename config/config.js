import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const MYSQL_HOST = process.env.MYSQL_HOST || 'eu-cdbr-west-03.cleardb.net';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'heroku_228dd14416d7edb';
const MYSQL_USER = process.env.MYSQL_USER || 'b41e382ba79b45';
const MYSQL_PASS = process.env.MYSQL_PASS || '8cb78768';

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
  token: {
    value: process.env.TOKEN_SECRET,
    expiration:process.env.TOKEN_EXPIRATION
  }
    
};

export default config;

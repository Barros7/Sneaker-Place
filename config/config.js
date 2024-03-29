import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const MYSQL_HOST = process.env.MYSQL_HOST || 'eu-cdbr-west-03.cleardb.net';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'heroku_3905732dcb8c5a8';
const MYSQL_USER = process.env.MYSQL_USER || 'b914075acea4be';
const MYSQL_PASS = process.env.MYSQL_PASS || 'cab019d9';

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

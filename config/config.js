import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;

const MYSQL_HOST = process.env.MYSQL_HOST || 'eu-cdbr-west-03.cleardb.net';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'heroku_c42cffc14216629';
const MYSQL_USER = process.env.MYSQL_USER || 'b6e7b249a1f3dd';
const MYSQL_PASS = process.env.MYSQL_PASS || '1773d455';

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

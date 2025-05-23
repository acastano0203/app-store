const { Client } = require('pg');
require('dotenv').config();

async function getConnetion() {

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();

  return client;
}

module.exports = getConnetion;



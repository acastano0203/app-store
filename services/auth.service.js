const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const pool = require('../libs/postgresPool.js');

const API_URL = "https://dry-garden-45582-af263137215f.herokuapp.com/users";

function generateToken(user) {
  return jwt.sign(
    { password: user.password, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

}

async function getUserId(username) {
  const query = `SELECT id FROM users WHERE username = '${username}'`;
  const rta = await pool.query(query);
  return rta.rows[0].id;
}


function cleanString(input) {
  if (typeof input !== 'string') return '';

  // 1. Elimina espacios al inicio y final (sin usar trim)
  input = input.replace(/^\s+|\s+$/g, '');

  // 2. Reemplaza múltiples espacios por uno solo
  input = input.replace(/\s+/g, ' ');

  // 3. Elimina saltos de línea y tabulaciones
  input = input.replace(/[\n\r\t]/g, '');

  return input;
}



async function loginUser(username, password) {
  // Consultar usuario por email desde la API externa
  const userid = await getUserId(username);
  const response = await axios.get(`${API_URL}/${userid}`);
  const user = response.data[0];
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // Limpiar y validar el password

  cleanString(password)
  cleanString(user.password)

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Credenciales inválidas");
  }
  const access_token = generateToken(user);
  return { access_token };
}

module.exports = {
  loginUser,
};

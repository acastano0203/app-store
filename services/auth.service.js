const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const API_URL = "https://dry-garden-45582-af263137215f.herokuapp.com/users";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

async function loginUser(username, password, id) {
  // Consultar usuario por email desde la API externa
  const response = await axios.get(`${API_URL}/${id}`);
  const user = response.data[0];
  if (!user) {
    throw new Error("Credenciales inválidas");
  }
  const match = await bcrypt.compare(password.trim(), user.password.trim());



  const access_token = generateToken(user);
  return { access_token };
}

module.exports = {
  loginUser,
};

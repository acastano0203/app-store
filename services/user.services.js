const boom = require('@hapi/boom');
const bcrypt = require("bcryptjs");

//const getConnetion = require('../libs/postgres.js');
const pool = require('../libs/postgresPool.js');


class UsersService {

  constructor() {
    this.Users = [];

    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });

  }

  // CREATE USER
  async createUser(data) {
    // Implementación de la creación de un usuario
    const hash = await bcrypt.hash(data.password, 10);
    const query = `INSERT INTO users (username, password) VALUES ('${data.username}', '${hash}') RETURNING *`;
    const rta = await this.pool.query(query);
    console.log("rta", rta.rows);
    return rta.rows[0];
  }
  // find
  async findUsers() {
    // Implementación de la búsqueda de usuarios
    //const client = await getConnetion();
    const query = 'SELECT * FROM users';
    const rta = await this.pool.query(query);
    //const rta = await client.query('SELECT * FROM users');
    return rta.rows;
  }
  // findone
  async findoneUser(id) {
    // Implementación de la búsqueda de un usuario por ID
    const query = `SELECT * FROM users WHERE id = ${id}`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }
  async updateUser(id, changes) {
    // Implementación de la actualización de un usuario
    const query = `UPDATE users SET username = '${changes.username}' WHERE id = ${id} RETURNING *`;
    const rta = await this.pool.query(query);
    return rta.rows;

  }

  // delete user
  async deleteUser(id) {
    // Implementación de la eliminación de un usuario
    const query = `DELETE FROM users WHERE id = ${id}`;
    const rta = await this.pool.query(query);
    if (rta.rowCount !== 0) {
      throw boom.notFound('delete successfully');
    }
    return rta.rowCount;
  }

}

module.exports = UsersService;

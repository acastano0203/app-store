const boom = require('@hapi/boom');
const pool = require('../libs/postgresPool.js');

class ItemsServices {

  constructor() {
    this.items = [];
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });
  }
  // CREATE ITEM
  async createItem(data) {
    // validar si el store_id existe en la tabla store
    const queryStore = `SELECT * FROM store WHERE id = '${data.store_id}'`;
    const rtaStore = await this.pool.query(queryStore);
    if (rtaStore.rows.length === 0) {
      throw boom.notFound('store not found');
    } else {
      const query = `INSERT INTO items (name, price, store_id) VALUES ('${data.name}', ${data.price}, '${data.store_id}') RETURNING *`;
      const rta = await this.pool.query(query);
      return rta.rows;
    }
  }

  //find
  async findItems() {
    const query = 'SELECT * FROM items';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  //findone
  async findoneItem(id) {
    // validar si el store_id existe en la tabla store
    const queryStore = `SELECT * FROM items WHERE id = '${id}'`;
    const rtaStore = await this.pool.query(queryStore);
    if (rtaStore.rows.length === 0) {
      throw boom.notFound('store not found');
    }
    return rtaStore.rows;
  }
  // update items
  async updateItem(id, changes) {
    // validar si el store_id existe en la tabla store
    const query = `UPDATE items SET name = '${changes.name}', price = '${changes.price}'   WHERE id = '${id}' RETURNING *`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  // delete item
  async deleteItem(id) {
    const query = `DELETE FROM items WHERE id = '${id}'`;
    const rta = await this.pool.query(query);
    if (rta.rowCount !== 0) {
      throw boom.notFound('delete successfully');
    }
    return rta.rowCount;
  }
}

module.exports = ItemsServices;

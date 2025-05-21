const boom = require('@hapi/boom');
const pool = require('../libs/postgresPool.js');


class StoresServices {

  constructor() {
    this.stores = [];
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err);
    });
  }



  async createStore(name) {
    const query = `INSERT INTO store (name) VALUES ('${name}') RETURNING *`;
    const rta = await this.pool.query(query);
    console.log("rta", rta.rows);
    return rta.rows;
  }

  // find
  async findStore() {
    const query = `
      SELECT
        s.id as store_id,
        s.name as store_name,
        i.id as item_id,
        i.name as item_name,
        i.price as item_price
      FROM store s
      LEFT JOIN items i ON s.id = i.store_id
      ORDER BY s.id, i.id
    `;
    const rta = await this.pool.query(query);

    const storesMap = new Map();

    for (const row of rta.rows) {
      if (!storesMap.has(row.store_id)) {
        storesMap.set(row.store_id, {
          id: row.store_id,
          name: row.store_name,
          items: []
        });
      }
      if (row.item_id) {
        storesMap.get(row.store_id).items.push({
          id: row.item_id,
          name: row.item_name,
          price: parseFloat(row.item_price)
        });
      }
    }

    return { stores: Array.from(storesMap.values()) };
  }
  // findone
  async findoneStore(id) {
    const query = `SELECT * FROM store WHERE id = '${id}'`;
    const rta = await this.pool.query(query);
    if (rta.rows.length === 0) {
      throw boom.notFound('store not found');
    }
    return rta.rows;
  }

  // update Store
  async updateStore(id, changes) {

    const query = `UPDATE store SET name = '${changes.name}' WHERE id = '${id}' RETURNING *`;
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  // delleteStore
  async deleteStore(id) {
    const query = `DELETE FROM store WHERE id = '${id}'`;
    const rta = await this.pool.query(query);
    if (rta.rowCount !== 0) {
      throw boom.notFound('delete successfully');
    }
    return rta.rowCount;
  }


}

module.exports = StoresServices;

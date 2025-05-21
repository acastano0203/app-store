const boom = require('@hapi/boom');


class StoresServices {

  constructor() {
    this.stores = [];
    this.generate();
  }

  generate() {
    const id = this.stores.length + 1;
    this.stores.push({
      id: id,
      name: 'Tienda de Ejemplo',
      items: [
        { id: 1, name: 'Producto 1', price: 10 },
        { id: 2, name: 'Producto 2', price: 20 },
        { id: 3, name: 'Producto 3', price: 30 }
      ]
    },
      {
        id: id + 1,
        name: 'Tienda de Ejemplo2',
        items: [
          { id: 1, name: 'Producto 1', price: 10 },
          { id: 2, name: 'Producto 2', price: 20 },
          { id: 3, name: 'Producto 3', price: 30 }
        ]
      });

  }

  async createStore(name) {
    const id = this.stores.length + 1;
    const newStore = {
      id: id,
      name,
      items: []
    }
    this.stores.push(newStore);
    return newStore;
  }

  // find
  async findStore() {
    return this.stores;

  }
  // findone
  async findoneStore(id) {
    const store = this.stores.find(item => item.id == id);
    if (!store) {
      throw boom.notFound('Store not found');
    }
    return store;
  }

  // update Store
  async updateStore(id, changes) {

    const index = this.stores.findIndex(item => item.id == parseInt(id));
    if (index === -1) {
      throw boom.notFound('Store not found');
    }
    this.stores[index] = {
      ...this.stores[index],
      ...changes
    }
    return this.stores[index];
  }

  // delleteStore
  async deleteStore(id) {
    const index = this.stores.findIndex(item => item.id == parseInt(id));
    if (index === -1) {
      throw boom.notFound('Store not found');
    }
    this.stores.splice(index, 1);
    return { id };
  }


}

module.exports = StoresServices;

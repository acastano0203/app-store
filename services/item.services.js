const boom = require('@hapi/boom');


class ItemsServices {

  constructor() {
    this.items = [];
    this.generate();
  }

  generate() {
    this.items.push({
      id: 1,
      name: 'Nevera',
      price: 500,
      store_id: 1,
    },
      {
        id: 2,
        name: 'bicicleta',
        price: 1500,
        store_id: 1,
      });
  }

  async createItem(data) {
    const newItem = {
      id: this.items.length + 1,
      ...data
    }
    this.items.push(newItem);
    return newItem;
  }

  //find
  async findItems() {
    return this.items;
  }

  //findone
  async findoneItem(id) {
    const item = this.items.find(item => item.id === parseInt(id))
    if (!item) {
      throw boom.notFound('item not found');
    }
    return item;
  }
  // update item
  async updateItem(id, changes) {
    const index = this.items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw boom.notFound('item not found');
    }
    this.items[index] = {
      ...this.items[index],
      ...changes
    }
    return this.items[index];
  }

  // delete item
  async deleteItem() {
    const index = this.items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw boom.notFound('item not found');
    }
    this.items.splice(index, 1);
    return { id };
  }
}

module.exports = ItemsServices;

const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.Users = [];
    this.generate();

  }
  generate() {
    this.Users.push({
      id: 1,
      username: 'Juan',
      password: '1234',
    }, {
      id: 2,
      username: 'camilo',
      password: '1234',
    })

  }
  async createUser(data) {
    // Implementación de la creación de un usuario
    const newUser = {
      id: this.Users.length + 1,
      ...data
    }
    this.Users.push(newUser);
    return newUser;
  }
  // find
  async findUsers() {
    // Implementación de la búsqueda de usuarios
    return this.Users;
  }
  // findone
  async findoneUser(id) {
    // Implementación de la búsqueda de un usuario por ID
    const user = this.Users.find(item => item.id === parseInt(id));
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
  async updateUser(id, changes) {
    // Implementación de la actualización de un usuario
    const index = this.Users.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw boom.notFound('Users not found');
    }
    const user = this.Users[index];
    this.Users[index] = {
      ...user,
      ...changes
    }
    return this.Users[index];
  }

  // delete user
  async deleteUser(id) {
    // Implementación de la eliminación de un usuario
    console.log("id", id);
    const index = this.Users.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
      throw boom.notFound('Users not found');
    }
    const user = this.Users[index];
    this.Users.splice(index, 1);
    return { id };
  }

}

module.exports = UsersService;

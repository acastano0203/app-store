const stores = require('./stores.router');
const items = require('./items.router');
const users = require('./users.router');

function routerApi(app) {

  app.use('/stores', stores);
  app.use('/items', items);
  app.use('/users', users);


}


module.exports = routerApi;

const stores = require('./stores.router');
const items = require('./items.router');
const users = require('./users.router');
const auth = require('./auth.router');

function routerApi(app) {

  app.use('/stores', stores);
  app.use('/items', items);
  app.use('/users', users);
  app.use('/auth', auth);


}


module.exports = routerApi;

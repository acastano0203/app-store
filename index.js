const express = require('express');
const { boomErrorHandler } = require('./middleware/error.handler.js');

const routerApi = require('./routers');

const app = express();
const port = 3000;

app.use(express.json());



routerApi(app);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

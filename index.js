const express = require('express');
const { boomErrorHandler } = require('./middleware/error.handler.js');
const cors = require('cors');

const routerApi = require('./routers');

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());



routerApi(app);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

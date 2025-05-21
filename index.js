const express = require('express');
const { boomErrorHandler } = require('./middleware/error.handler.js');
const cors = require('cors');

const routerApi = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', // o '*', solo para pruebas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options("*", cors());



routerApi(app);
app.use(boomErrorHandler);

app.get('/', (req, res) => {
  res.send('¡Run server!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

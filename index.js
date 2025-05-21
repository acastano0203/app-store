const express = require('express');
const { boomErrorHandler } = require('./middleware/error.handler.js');
const cors = require('cors');

const routerApi = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/*const whiteList = ['http://localhost:8080', 'https://myapp.co', 'http://localhost:5173'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};*/
app.use(cors({
  origin: 'http://localhost:5173', // o '*', solo para pruebas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));



routerApi(app);
app.use(boomErrorHandler);

app.get('/', (req, res) => {
  res.send('¡Run server!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

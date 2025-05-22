const express = require('express');
const { boomErrorHandler } = require('./middleware/error.handler.js');
const cors = require('cors');

const routerApi = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'https://storefrontend-three.vercel.app'];


app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como desde Postman o CURL)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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

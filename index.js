const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares start
app.use(cors());
// const corsOptions = {
//   origin: 'https://handre-restaurant.vercel.app/',
// };
// app.use(cors(corsOptions));
app.use(express.json());
const debug = require('./middlewares/debugServer');
app.use(debug.logUrl);

// Endpoint

const ProductsEndpoint = require('./endpoints/ProductsEndPoints');
app.use(ProductsEndpoint);
const UserLoginEndpoint = require('./endpoints/Users');
app.use(UserLoginEndpoint);
const AuthEndpoints = require('./endpoints/AuthUser');
app.use(AuthEndpoints);
const SendTableEndpoints = require('./endpoints/SendTable');
app.use(SendTableEndpoints);

// Middlewares end
app.use(debug.errorHandler);

// Start

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then((response) => {
    console.log('DB Connesso!');
    app.listen(port, () => {
      console.log('Server in ascolta sulla ' + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

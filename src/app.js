const express = require('express');
const devicesRoute = require('./routes/devicesRoute.js');

const app = express();
app.use(express.json());
app.use(devicesRoute);

module.exports = app;
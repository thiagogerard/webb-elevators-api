const express = require('express');
const connectDB = require('./config/db.js');
const devicesRoute = require('./routes/devicesRoute.js');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(devicesRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server runnign on port ${PORT}`);
});
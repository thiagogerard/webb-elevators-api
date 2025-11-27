const express = require('express');
const connectDB = require('./config/db.js');
const devicesRoute = require('./routes/devicesRoute.js');

const app = express();

connectDB();

app.use(express.json());
app.use(devicesRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server runnign on port ${PORT}`);
});
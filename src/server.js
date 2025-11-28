const connectDB = require('./config/db.js');
const app = require('./app.js');
require('dotenv').config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server runnign on port ${PORT}`);
});
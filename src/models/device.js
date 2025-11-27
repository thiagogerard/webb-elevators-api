const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    lastUpdated: { type: Date }
});

const deviceModel = mongoose.model('Device', deviceSchema);

module.exports = deviceModel;
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true }
}, {
    timestamps: true
});

const deviceModel = mongoose.model('Device', deviceSchema);

module.exports = deviceModel;
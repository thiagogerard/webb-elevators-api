const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
    elevatorId: { type: Number, required: true, index: true },
    date: { type: Date, required: true },
    count: { type: Number, default: 0 },
    readings: [{
        timestamp: { type: Date, required: true },
        floor: { type: Number, required: true },
        status: { type: Number, require: true },
        _id: false
    }]
}, {
    timestamps: true
});

telemetrySchema.index({ elevatorId: 1, date: 1 }, { unique: true });

const telemetryModel = mongoose.model('Telemetry', telemetrySchema);

module.exports = telemetryModel;
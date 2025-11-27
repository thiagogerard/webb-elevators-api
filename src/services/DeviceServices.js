const Device = require('../models/device.js');
const Services = require('./Services.js');

class DeviceServices extends Services {
    contructor() {
        super(Device);
    }
}

module.exports = DeviceServices;
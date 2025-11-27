const Controller = require('./Controller.js');
const DeviceServices = require('../services/DeviceServices.js');

const deviceServices = new DeviceServices();

class DeviceController extends Controller {
    constructor() {
        super(deviceServices);
    }
}

module.exports = DeviceController;
const express = require('express');
const DeviceController = require('../controllers/DeviceController.js')

const router = express.Router();
const deviceController = new DeviceController();

router.get('/devices', (req, res) => deviceController.getAll(req, res));
router.get('/devices/:id', (req, res) => deviceController.getById(req, res));
router.post('/devices', (req, res) => deviceController.create(req, res));
router.put('/devices/:id', (req, res) => deviceController.update(req, res));
router.delete('/devices/:id', (req, res) => deviceController.delete(req, res));

module.exports = router;
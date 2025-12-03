const net = require('net');

const SERVER_HOST = 'localhost';
const SERVER_PORT = 4000;
const ELEVATOR_ID = 101;

console.log(`Starting firmware of Elevator ${ELEVATOR_ID}...`);

const client = new net.Socket();

client.connect(SERVER_PORT, SERVER_HOST, () => {
    console.log('Hardware connected to server!');
    startSendingTelemetry();
});
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

client.on('close', () => {
    console.log('Failed connection. Is the server offline?');
    process.exit(1);
});

client.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
});

function startSendingTelemetry() {
    let currentFloor = 1;
    let direction = 'UP';
    let status = 1;

    setInterval(() => {
        if (direction === 'UP') {
            currentFloor++;
            if (currentFloor >= 10) direction = 'DOWN';
        } else {
            currentFloor--;
            if (currentFloor <= 1) direction = 'UP';
        }

        const packet = Buffer.alloc(5);

        packet.writeUInt8(0xAA, 0);
        packet.writeUInt8(ELEVATOR_ID, 1);
        packet.writeUInt8(currentFloor, 2);
        packet.writeUInt8(status, 3);
        packet.writeUInt8(0xFF, 4);

        client.write(packet);

        console.log(`Sent: Floor ${currentFloor} | Hex: <${packet.toString('hex')}>`);

    }, 2000);
}
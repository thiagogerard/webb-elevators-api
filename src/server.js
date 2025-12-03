const connectDB = require('./config/db.js');
const app = require('./app.js');
const net = require('net');
const Telemetry = require('./models/telemetry.js');
const { timeStamp } = require('console');
require('dotenv').config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server runnign on port ${PORT}`);
});

const TCP_PORT = 4000;

const tcpServer = net.createServer((socket) => {
    console.log('Hardware connected via TCP'); 

    socket.on('data', async (data) => {
        try {
            if (data.length !== 5 || data[0] !== 0xAA || data[4] !== 0xFF) {
                console.warn('Malfuncioning packet or network noise:', data.toString('hex'));
                return;
            }

            const elevatorId = data.readUInt8(1);
            const floor = data.readUInt8(2);
            const status = data.readUInt8(3);

            console.log(`TCP received | Elevator: ${elevatorId} | Floor: ${floor} | Status: ${status}`);

            const now = new Date();
            const startOfHour = new Date(now);
            startOfHour.setMinutes(0, 0, 0);

            await Telemetry.updateOne(
                { elevatorId, date: startOfHour },
                {
                    $push: { readings: { timeStamp: now, floor, status } },
                    $inc: { count: 1 }
                },
                { upsert: true }
            );

        } catch(err) {
            console.error('Error proscessing telemetry:', err.message);
        }
    });

    socket.on('end', () => console.log('Hardware disconnected'));
    socket.on('error', (err) => console.log('Error on socket:', err.message));
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP telemetry server running on port ${TCP_PORT}`);
});
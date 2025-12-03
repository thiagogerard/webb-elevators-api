const connectDB = require('./config/db.js');
const app = require('./app.js');
const net = require('net');
const Telemetry = require('./models/telemetry.js');
const { z } = require('zod');
require('dotenv').config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`HTTP API runnign on port ${PORT}`);
});

const TelemetrySchema = z.object({
    elevatorId: z.number().int().positive(),
    floor: z.number().int().min(0).max(10),
    status: z.number().int().min(1).max(3)
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

            const rawData = {
                elevatorId: data.readUInt8(1),
                floor: data.readUInt8(2),
                status: data.readUInt8(3)
            }

            const cleanData = TelemetrySchema.parse(rawData);

            console.log(`TCP received | Elevator: ${cleanData.elevatorId} | Floor: ${cleanData.floor} | Status: ${cleanData.status}`);

            const now = new Date();
            const startOfHour = new Date(now);
            startOfHour.setMinutes(0, 0, 0);

            await Telemetry.updateOne(
                { elevatorId: cleanData.elevatorId, date: startOfHour },
                {
                    $push: { readings: { timeStamp: now, floor: cleanData.floor, status: cleanData.status } },
                    $inc: { count: 1 }
                },
                { upsert: true }
            );

        } catch(err) {
            if(err instanceof z.ZodError) {
                console.error('Safety Lock (Zod):', err.issues);
            } else {
                console.error('Generic error', err.message);
            }
        }
    });

    socket.on('end', () => console.log('Hardware disconnected'));
    socket.on('error', (err) => console.log('Error on socket:', err.message));
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP telemetry server running on port ${TCP_PORT}`);
});
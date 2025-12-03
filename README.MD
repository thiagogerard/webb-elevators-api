# 🏢 Webb Elevators API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

## 📖 About the Project

**Webb Elevators API** is a robust backend system designed to manage and monitor IoT elevator devices. The system is engineered to handle real-time telemetry streams, store operation history efficiently, and manage device registries.

The project features a **Hardware Simulator (Mock)** that emulates the physical behavior of an elevator controller, continuously sending data to the API for integration and load testing.

## 🚀 Technologies

- **Node.js** & **Express**: Foundation for the RESTful API.
- **MongoDB** & **Mongoose**: NoSQL database for flexible storage of device schemas and telemetry logs.
- **Zod**: Strict data validation to ensure input integrity (e.g., enforcing physical floor limits).
- **ESLint**: Code standardization and linting.
- **MVC Architecture**: Clear separation of concerns between Models, Controllers, and Services.

---

## 📂 Project Structure

The project follows a layered architecture to ensure maintainability and scalability:

```
├── scripts/
│   └── elevator-mock.js   # Hardware simulation script
├── src/
│   ├── config/            # DB configuration and environment variables
│   ├── controllers/       # Request handling logic
│   ├── middlewares/       # Error handling and interceptors
│   ├── models/            # MongoDB Schemas (Device, Telemetry)
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic
│   ├── app.js             # Express app configuration
│   └── server.js          # Entry point (Server initialization)
└── ...
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

### Steps

**Clone the repository:**

```bash
git clone https://github.com/your-username/webb-elevators-api.git
cd webb-elevators-api
```

**Install dependencies:**

```bash
npm install
```

**Configure Environment Variables:**  
Create a `.env` file in the root directory and configure your database connection:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/webb-elevators
```

**Start the Server:**

```bash
npm run dev
```

---

## 🎮 Usage Guide

### 1. Running the API

When the server starts (`npm run dev`), the API will listen on the defined port (default: `3000`).

### 2. Running the Simulation (Elevator Mock)

This project includes a script that simulates a physical elevator. It generates data representing floors, door status, and direction, sending it automatically to the API.

Open a new terminal and run:

```bash
node scripts/elevator-mock.js
```

You will see the "elevator" moving up and down in the console, sending logs to the API.

---

## 📡 API Documentation

### 1. Telemetry Ingestion

Receives status data from the hardware. Validated by Zod to ensure physical consistency (e.g., rejects `"Floor 50"` if the building has only 10 floors).

- **URL**: `/telemetry` (Check `routes/` for exact path)
- **Method**: `POST`
- **Body (JSON)**:

```json
{
  "deviceId": "elevator-01",
  "floor": 5,
  "direction": "UP",
  "status": "MOVING",
  "doorStatus": "CLOSED",
  "timestamp": "2023-10-27T10:00:00.000Z"
}
```

---

### 2. Device Management

RESTful endpoints for CRUD operations on devices:

- `GET /devices` - List all devices
- `POST /devices` - Register a new device
- `GET /devices/:id` - Get device details

---

## 🛡️ Design & Security Decisions

- **Defensive Validation (Zod)**: Chosen over native Mongoose validation to provide granular control and user-friendly error messages before the data even touches the database layer.

- **Centralized Error Handling**: A dedicated error middleware ensures the API never crashes silently, always returning standardized JSON responses.

- **Realistic Simulation**: The `elevator-mock.js` script was created to test stress scenarios, ensuring the API can handle sequential requests typical of IoT sensors.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit Pull Requests.

---

Developed with 💜 by Thiago Geraldi.

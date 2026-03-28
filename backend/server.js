const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Create an HTTP server (Socket.io requires a raw HTTP server)
const server = http.createServer(app);

// Initialize Socket.io with CORS allowing your React frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // This is the default Vite port. Change if yours is different!
    methods: ["GET", "POST"]
  }
});

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running normally' });
});

// --- THE REAL-TIME TRACKING ENGINE ---
io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // 1. Admin joins a specific "room" to listen for updates
  socket.on('join-admin-room', () => {
    socket.join('admin-dashboard');
    console.log(`Socket ${socket.id} joined the admin dashboard`);
  });

  // 2. MR sends their location to the server
  socket.on('mr-location-update', (data) => {
    // Expected data format: { mrId: 1, lat: 22.314, lng: 87.310, timestamp: '...' }
    console.log(`Location update from MR ${data.mrId}: ${data.lat}, ${data.lng}`);

    // 3. Server broadcasts this data ONLY to the admin room
    // This prevents MRs from seeing each other's locations
    socket.to('admin-dashboard').emit('admin-location-broadcast', data);
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- START THE SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`GeoTrack Backend running on http://localhost:${PORT}`);
});
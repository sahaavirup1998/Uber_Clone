const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

// Initialize socket.io server
function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*', // TODO: Replace with frontend URL in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // 🟢 Handle join event
    socket.on('join', async (data) => {
      try {
        const { userId, userType } = data;
        console.log(`User ${userId} joined as ${userType}`);

        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (err) {
        console.error('Error in join event:', err);
        socket.emit('error', { message: 'Failed to join socket room' });
      }
    });

    // 🟡 Handle captain location updates
    socket.on('update-location-captain', async (data) => {
      try {
        const { userId, location } = data;

        if (!location || !location.lat || !location.lng) {
          return socket.emit('error', { message: 'Invalid location data' });
        }

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        });

      } catch (err) {
        console.error('Error updating captain location:', err);
        socket.emit('error', { message: 'Failed to update location' });
      }
    });

    // 🔴 Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

// Function to send message to specific socket
function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit('message', message);
  } else {
    console.error('Socket.io is not initialized. Call initializeSocket first.');
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
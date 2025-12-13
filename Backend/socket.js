const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

// Function to initialize the socket.io server
function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*', // Update this to your frontend's URL in production
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
        
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);
            

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId,{socketId: socket.id});
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId,{socketId: socket.id});
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

// Function to send a message to a specific socket ID
function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io is not initialized. Call initializeSocket first.');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
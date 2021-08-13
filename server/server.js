const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');

// env configuaration
require('dotenv').config();

// database connection
const connectDB = require('./db/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3001;
const Server = http.createServer(app);
const io = socketio(Server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

// Routes
app.use('/auth/', require('./Routes/Auth'));
app.use('/api/channel', require('./Routes/Api/Channel'));

// api
app.use('/api/user', require('./Routes/Api/user'));

// const rooms = {};

// Schema of Rooms :

// rooms = Particular_roomname : [{
//     userId, name, socketId
// }, {.....}, {.......}, .....];

// Real time communication
// io.on('connection', (socket) => {
//     socket.on('join user', (data) => {
//         // now if and only if user is joined in a room, he is able to access these connections
//         socket.join(data.room.roomname);
//         if (!rooms[data.room.roomname]) {
//             rooms[data.room.roomname] = [{
//                 userId: data.user._id,
//                 name: data.user.name,
//                 socketId: socket.id
//             }];
//         } else {
//             rooms[data.room.roomname].push({
//                 userId: data.user._id,
//                 name: data.user.name,
//                 socketId: socket.id
//             });
//         }
//         socket.to(data.room.roomname).emit('user joined', { name: data.user.name, users: rooms[data.room.roomname] });
//         socket.on('send message', (data) => {
//             socket.to(data.roomname).emit('received message', data)
//         })
//         socket.on('disconnect', () => {
//             const room = rooms[data.room.roomname];
//             if (room) {
//                 const index = room.findIndex(user => user.name === data.user.name);
//                 if (index !== -1) {
//                     room.splice(index, 1);
//                 }
//                 if (room.length === 1) {
//                     delete room;
//                 }
//             }
//             socket.to(data.room.roomname).emit('disconnected user', { name: data.user.name, users: rooms[data.room.roomname] })
//         })
//         if (rooms[data.room.roomname]) socket.emit('get all active users', rooms[data.room.roomname]);
//     })

// })

Server.listen(PORT, () => console.log(`Server on port ${PORT}`));

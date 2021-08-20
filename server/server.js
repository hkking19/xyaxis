const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');

// env configuaration
require('dotenv').config();

// database connection
const connectDB = require('./db/db');
const socketManager= require('./services/sockets');

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

socketManager(io);

Server.listen(PORT, () => console.log(`Server on port ${PORT}`));

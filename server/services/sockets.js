
const socketManager = (io) => {
    io.on('connection', (socket) => {
        socket.on('join-channel', (channelId) => {
            // now if and only if user is joined in a room, he is able to access these connections
            socket.join(channelId);
            console.log(`${channelId}`);
            socket.on('send-message', (message) => {
                socket.to(message.channelId).emit('received-message', message);
            })
        })
        socket.on('leave-user', (channelId) => {
            socket.leave(channelId);
        })
    })
};
module.exports = socketManager;
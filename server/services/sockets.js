
module.exports.socketManager = (io) => {
	io.on('connection', (socket) => {
		socket.on('join-channel', (userId) => {
			// now if and only if user is joined in a room, he is able to access these connections
			socket.join(userId);
			console.log(`${userId} joined`);
		});
		socket.on('send-message', (message) => {
			// console.log(`channel user ${message.channelId._id}`);
			// socket.to(message.channelId._id).emit('received-message', message);
			message.channelId.users.map((user) => {
				if (message.sender._id !== user) {
					console.log(`channel user ${user}`);
					socket.to(user).emit('received-message', message);
				}
			});
		});
		socket.on('leave-user', (channelId) => {
			socket.leave(channelId);
		});
	});
};
const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const Room = require('../../models/RoomSchema');
const Message = require('../../models/MessageSchema');
const {
	create,
	get,
	join,
	search,
	getPublic,
} = require('../../controllers/channel');

router.post('/create', auth, create);

router.post('/join', auth, join);

router.get('/', auth, get);

router.get('/find', auth, search);

router.get('/getPublicRooms', auth, getPublic);

router.get('/getRoom', auth, async (req, res) => {
	try {
		const { roomname } = req.query;
		const room = await Room.findOne({ roomname });

		if (!room) return res.send({ error: { message: "Channel doesn't exist" } });

		res.status(200).send(room);
	} catch (err) {
		console.log(err);
		res.status(203).send({ error: { message: 'Error in Server!' } });
	}
});

router.post('/message', auth, async (req, res) => {
	try {
		const { userId, roomname, message } = req.body;
		const room = await Room.findOne({ roomname });
		if (!room)
			return res.status(200).send({
				error: {
					message: 'You cannot send message without being in the room!',
				},
			});

		let msg = new Message({
			roomId: room._id,
			sender: userId,
			roomname,
			message,
		});
		await msg.save();
		msg = await msg
			.populate({ path: 'sender', select: '-password' })
			.execPopulate();
		msg = await msg.populate('roomId').execPopulate();
		await Room.findByIdAndUpdate(room._id, { recentMessage: msg._id });
		res.status(200).send(msg);
	} catch (error) {
		console.log(error);
		res.status(203).send({ error: { message: 'Error in Server!' } });
	}
});

router.get('/getMessages', auth, async (req, res) => {
	const { roomname } = req.query;
	const userId = req.user.id;
	try {
		const room = await Room.findOne({
			roomname,
			users: { $elemMatch: { $eq: userId } },
		});

		if (!room)
			return res.status(203).send({
				error: {
					message: 'Your are not part of room. Access Denied!',
				},
			});

		const messages = await Message.find({ roomId: room._id }).populate({
			path: 'sender',
			select: '-password',
		});

		res.status(200).send(messages);
	} catch (err) {
		console.log(err);
		res.status(203).send({ error: { message: 'Error in Server!' } });
	}
});

module.exports = router;

const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const {
	create,
	get,
	join,
	search,
	getPublic,
	getChannelData,
	message,
} = require('../../controllers/channel');

router.post('/create', auth, create);

router.post('/join', auth, join);

router.get('/', auth, get);

router.get('/find', auth, search);

router.get('/getPublicRooms', auth, getPublic);

router.get('/getChannel/:channelId', auth, getChannelData);

router.post('/message', auth, message);

// router.get('/getMessages', auth, async (req, res) => {
// 	const { roomname } = req.query;
// 	const userId = req.user.id;
// 	try {
// 		const room = await Room.findOne({
// 			roomname,
// 			users: { $elemMatch: { $eq: userId } },
// 		});

// 		if (!room)
// 			return res.status(203).send({
// 				error: {
// 					message: 'Your are not part of room. Access Denied!',
// 				},
// 			});

// 		const messages = await Message.find({ roomId: room._id }).populate({
// 			path: 'sender',
// 			select: '-password',
// 		});

// 		res.status(200).send(messages);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(203).send({ error: { message: 'Error in Server!' } });
// 	}
// });

module.exports = router;

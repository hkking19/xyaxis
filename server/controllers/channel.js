const Room = require('../models/RoomSchema');

// getting private channels
module.exports.get = async (req, res) => {
	try {
		const results = await Room.find({
			users: { $elemMatch: { $eq: req.user.id } },
		})
			.populate('latestMessage')
			.sort({ createdAt: '-1' });

		res.status(200).send(results);
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: 'Error in Server!' });
	}
};

module.exports.getPublic = async (req, res) => {
	const { public } = req.query;
	try {
		const channels = await Room.find({ public });

		res.status(200).send(channels);
	} catch (err) {
		console.log(err);
		res.status(400).send({ error: { message: 'Error inServer!' } });
	}
};

module.exports.create = async (req, res) => {
	const { channelName, public, userId } = req.body;
	if (!req.body)
		return res.status(203).send({ error: { message: 'no data found' } });

	try {
		const users = [];
		const messages = [];
		users.push(userId);

		const channelData = {
			users,
			createdBy: userId,
			roomname: channelName,
			messages,
			public,
		};

		let channel = await Room.findOne({ roomname: channelName });

		if (channel !== null)
			return res.status(400).send({ error: 'Room is already exist' });

		channel = new Room(channelData);

		await channel.save();

		res.status(200).send(channel);
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: 'Error in Server!' });
	}
};


module.exports.join = async (req, res) => {
	const { channelName, userId } = req.body;

	if (!req.body) return res.status(203).send({ error: 'no data found' });

	try {
		let room = await Room.findOne({ roomname: channelName });
		if (!room) return res.status(203).send({ error: 'Channel does not exist' });

		room.users.map((user) => {
			if (user === userId) {
				return res.status(200).send(room);
			}
		});

		room = await Room.findByIdAndUpdate(
			room._id,
			{ $addToSet: { users: userId } },
			{ new: true }
		);

		res.status(200).send(room);
	} catch (error) {
		console.log(error);
		res.status(404).send({ error: 'Error in Server!' });
	}
};

module.exports.search = async (req, res) => {
	if (!req.query.search)
		return res.status(203).send({ error: 'no data found' });

	try {
		const channels = await Room.find({
			$or: [{ roomname: { $regex: req.query.search, $options: 'i' } }],
		});

		if (!channels)
			return res.status(203).send({ error: 'Channel does not exist' });

		setTimeout(() => {
			res.status(200).send(channels);
		}, 2000);
	} catch (error) {
		console.log(error);
		res.status(404).send({ error: 'Error in Server!' });
	}
};

const Channel = require('../models/ChannelSchema');
const Message = require('../models/MessageSchema');
const User = require('../models/UserSchema');

// getting private channels
module.exports.get = async (req, res) => {
	try {
		let results = await Channel.find({
			users: { $elemMatch: { $eq: req.user.id } },
		})
			.populate('recentMessage')
			.sort({ recentMessage: '-1' });

		results = await User.populate(results, { path: 'recentMessage.sender' });
		res.status(200).send(results);
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: 'Error in Server!' });
	}
};

module.exports.getPublic = async (req, res) => {
	const { public } = req.query;
	try {
		const channels = await Channel.find({ public });

		res.status(200).send(channels);
	} catch (err) {
		console.log(err);
		res.status(400).send({ error: 'Error inServer!' });
	}
};

module.exports.getChannelData = async (req, res) => {
	try {
		// eslint-disable-next-line prefer-const
		let { channelId } = req.params;
		channelId = channelId.slice(1);
		const channel = await Channel.findOne({
			_id: channelId,
			users: { $elemMatch: { $eq: req.user.id } },
		}).populate('users');

		if (!channel)
			return res
				.status(400)
				.send({ error: 'Your are not part of channel. Access Denied!' });

		const messages = await Message.find({ channelId: channel._id }).populate({
			path: 'sender',
			select: '-password',
		});

		const data = {
			channel,
			messages,
		};
		res.status(200).send(data);
	} catch (err) {
		console.log(err);
		res.status(400).send({ error: 'Error in Server!' });
	}
};

module.exports.create = async (req, res) => {
	const { channelName, public, userId } = req.body;
	if (!req.body) return res.status(203).send({ error: 'no data found' });

	try {
		const users = [];
		const messages = [];
		users.push(userId);

		const channelData = {
			users,
			createdBy: userId,
			channelName,
			messages,
			public,
		};

		let channel = await Channel.findOne({ channelName });

		if (channel !== null)
			return res.status(400).send({ error: 'Channel is already exist' });

		channel = new Channel(channelData);

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
		let channel = await Channel.findOne({ channelName });
		if (!channel)
			return res.status(203).send({ error: 'Channel does not exist' });

		channel.users.map((user) => {
			if (user === userId) {
				return res.status(200).send(channel);
			}
		});

		channel = await Channel.findByIdAndUpdate(
			channel._id,
			{ $addToSet: { users: userId } },
			{ new: true }
		);

		res.status(200).send(channel);
	} catch (error) {
		console.log(error);
		res.status(404).send({ error: 'Error in Server!' });
	}
};

module.exports.search = async (req, res) => {
	if (!req.query.search)
		return res.status(203).send({ error: 'no data found' });

	try {
		const channels = await Channel.find({
			$or: [{ channelName: { $regex: req.query.search, $options: 'i' } }],
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

module.exports.message = async (req, res) => {
	try {
		const { userId, channelId, message } = req.body;
		const channel = await Channel.findOne({ _id: channelId });
		if (!channel)
			return res.status(200).send({
				error: 'You cannot send message without being in the channle!',
			});

		let msg = new Message({
			channelId: channel._id,
			sender: userId,
			channelName: channel.channelName,
			message,
		});
		await msg.save();

		msg = await msg
			.populate({ path: 'sender', select: '-password' })
			.execPopulate();
		msg = await msg.populate('channelId').execPopulate();
		await Channel.findByIdAndUpdate(channel._id, { recentMessage: msg._id });
		res.status(200).send(msg);
	} catch (error) {
		console.log(error);
		res.status(203).send({ error: { message: 'Error in Server!' } });
	}
};

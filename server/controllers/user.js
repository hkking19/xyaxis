const User = require('../models/UserSchema');

module.exports.getProfile = async (req, res) => {
	const { username } = req.query;

	const user = await User.findOne({ username: username }).select([
		'-password',
		'-email',
	]);
	if (!user) {
		return res.status(200).send({ error: 'User not found' });
	}
	return res.status(200).send(user);
};

module.exports.availableUserName = async (req, res) => {
	const { username } = req.query;

	const user = await User.findOne({ username });
	if (user === null) {
		return res.status(200).send({ usernameAvailable: true });
	}
	return res.status(200).send({ usernameAvailable: false });
};

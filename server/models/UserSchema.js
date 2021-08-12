const mongoose = require('mongoose');

const User = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
}, { timestamps: true });

module.exports = mongoose.model('User', User);

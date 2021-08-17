const mongoose = require('mongoose');

const { Schema } = mongoose;

const Message = mongoose.Schema(
	{
		channelId: {
			type: Schema.Types.ObjectId,
			ref: 'Channel',
		},
		channelName: {
			type: String,
			required: 'true',
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', Message);

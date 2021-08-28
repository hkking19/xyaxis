import {
	SET_CHANNEL,
	SET_CHANNELS,
	SOCKET_CONNECTION,
	PUBLIC_CHANNELS,
	SET_SEARCHED_CHANNELS,
	REMOVE_SEARCHED_CHANNELS,
	SET_SEARCHING,
	ADD_NEW_MESSAGE,
	SET_RECENT_MESSAGE,
} from '../type';

const ChannelReducer = (state, action) => {
	switch (action.type) {
		case SET_CHANNEL:
			return {
				...state,
				Channel: action.payload,
			};
		case SET_CHANNELS:
			return {
				...state,
				channels: action.payload,
			};
		case ADD_NEW_MESSAGE:
			Array.isArray(state.Channel.messages) &&
				state.Channel.messages.push(action.payload);
			return {
				...state,
			};
		case SET_RECENT_MESSAGE:
			state.channels.map((channel) => {
				if (channel._id === action.payload.channelId._id) {
					channel.recentMessage = action.payload;
				}
			});
			state.channels = state.channels.sort((a, b) => {
				const f = new Date(a.recentMessage.updatedAt);
				const s = new Date(b.recentMessage.updatedAt);
				console.log(a.recentMessage);
				console.log(b.recentMessage);
				return s - f;
			});
			return {
				...state,
			};
		case SOCKET_CONNECTION:
			return {
				...state,
				socket: action.payload,
			};
		case PUBLIC_CHANNELS:
			return {
				...state,
				publicChannels: action.payload,
			};
		case SET_SEARCHED_CHANNELS:
			return {
				...state,
				searchedChannels: action.payload,
			};
		case SET_SEARCHING:
			return {
				...state,
				searching: action.payload,
			};
		case REMOVE_SEARCHED_CHANNELS:
			return {
				...state,
				searchedChannels: action.payload,
			};
		default:
			return state;
	}
};

export default ChannelReducer;

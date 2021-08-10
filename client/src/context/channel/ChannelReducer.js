import {
	SET_CHANNEL,
	SET_CHANNELS,
	SET_MESSAGE,
	SOCKET_CONNECTION,
	PUBLIC_CHANNELS,
	SET_SEARCHED_CHANNELS,
	REMOVE_SEARCHED_CHANNELS,
	SET_SEARCHING,
} from '../type';

const ChannelReducer = (state, action) => {
	switch (action.type) {
		case SET_CHANNEL:
			return {
				...state,
				Channel: action.payload,
				Channelname: action.payload.Channelname,
			};
		case SET_CHANNELS:
			return {
				...state,
				channels: action.payload,
			};
		case SET_MESSAGE:
			return {
				...state,
				messages: action.payload,
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

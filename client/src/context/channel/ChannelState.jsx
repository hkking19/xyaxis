import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import ChannelContext from './ChannelContext';
import ChannelReducer from './ChannelReducer';
import ErrorContext from '../error/ErrorContext';
import setAuthToken from '../../Utils/setAuthToken';

import {
	SET_CHANNELS,
	SET_CHANNEL,
	SOCKET_CONNECTION,
	PUBLIC_CHANNELS,
	SET_SEARCHED_CHANNELS,
	SET_SEARCHING,
	REMOVE_SEARCHED_CHANNELS,
} from '../type';
import { getCookie, isAuth } from '../../helpers/auth';

const ChannelState = (props) => {
	const errorContext = useContext(ErrorContext);
	const { Seterror } = errorContext;

	const initialState = {
		channels: [],
		Channelname: '',
		Channel: {},
		messages: [],
		publicChannels: [],
		searchedChannels: [],
		searching: false,
		socket: null,
	};

	const [state, dispatch] = useReducer(ChannelReducer, initialState);

	const getAllPublicChannels = async () => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			const res = await axios.get(
				'http://localhost:3001/api/channel/getPublicRooms?public=true'
			);
			const data = res.data;
			if (data.error) {
				Seterror(data.error.message);
				return;
			}
			dispatch({ type: PUBLIC_CHANNELS, payload: data });
		}
	};

	const createChannel = async (channel) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				channel.userId = isAuth()._id;
				console.log(channel);
				const res = await axios.post(
					'http://localhost:3001/api/channel/create',
					channel
				);
				const data = res.data;
				console.log(data);
			} catch (error) {
				if (error.response) {
					const msg = {
						message: error.response.data.error,
						type: 'danger',
					};
					Seterror(msg);
					return false;
				}
			}
		}
	};

	const joinChannel = async (channelData) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				channelData.userId = isAuth()._id;
				const res = await axios.post(
					'http://localhost:3001/api/channel/join',
					channelData
				);
			} catch (error) {
				if (error.response) {
					const msg = {
						message: error.response.data.error,
						type: 'danger',
					};
					Seterror(msg);
					return false;
				}
			}
		}
	};

	const getAllUsersChannels = async (next) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				const res = await axios.get(
					'http://localhost:3001/api/channel'
				);
				if (res.data) {
					dispatch({ type: SET_CHANNELS, payload: res.data });
					next(res.data);
				}
			} catch (error) {
				console.log(error);
				dispatch({ type: SET_CHANNELS, payload: [] });
			}
		}
	};

	const searchChannel = async (key) => {
		const token = getCookie('token');
		if (token) {
			if (key === '') {
				dispatch({ type: SET_SEARCHED_CHANNELS, payload: [] });
				setSearching(false);
				return;
			}
			setAuthToken(token);
			try {
				setSearching(true);
				const res = await axios.get(
					`http://localhost:3001/api/channel/find?search=${key}`
				);
				if (key !== '' && res.data.length === 0) {
					dispatch({
						type: SET_SEARCHED_CHANNELS,
						payload: 'No Data Found',
					});
				} else if (res.data) {
					removeSearchChannels();
					dispatch({
						type: SET_SEARCHED_CHANNELS,
						payload: res.data,
					});
				}
			} catch (error) {
				if (error.response) {
					const msg = {
						message: error.response.data.error,
						type: 'danger',
					};
					Seterror(msg);
					return false;
				}
			}
		}
	};
	function setSearching(value) {
		dispatch({ type: SET_SEARCHING, payload: value });
	}
	const removeSearchChannels = () => {
		dispatch({ type: REMOVE_SEARCHED_CHANNELS, payload: [] });
	};
	return (
		<ChannelContext.Provider
			value={{
				Channelname: state.Channelname,
				Channel: state.Channel,
				messages: state.messages,
				channels: state.channels,
				socket: state.socket,
				publicChannels: state.publicChannels,
				searchedChannels: state.searchedChannels,
				searching: state.searching,
				createChannel,
				joinChannel,
				getAllPublicChannels,
				getAllUsersChannels,
				searchChannel,
				setSearching,
				removeSearchChannels,
			}}>
			{props.children}
		</ChannelContext.Provider>
	);
};

export default ChannelState;

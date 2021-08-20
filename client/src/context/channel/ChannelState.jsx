import React, { useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import ChannelContext from './ChannelContext';
import ChannelReducer from './ChannelReducer';
import ErrorContext from '../error/ErrorContext';
import setAuthToken from '../../Utils/setAuthToken';

import { getCookie, isAuth } from '../../helpers/auth';
import { getTime } from '../../helpers/time';

import {
	SET_CHANNELS,
	SET_CHANNEL,
	SOCKET_CONNECTION,
	PUBLIC_CHANNELS,
	SET_SEARCHED_CHANNELS,
	SET_SEARCHING,
	REMOVE_SEARCHED_CHANNELS,
	ADD_NEW_MESSAGE,
} from '../type';

const ChannelState = (props) => {
	const errorContext = useContext(ErrorContext);
	const { Seterror } = errorContext;

	const initialState = {
		channels: [],
		Channelname: '',
		Channel: {},
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

	const getChannelData = async (channelId) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				const res = await axios.get(
					`http://localhost:3001/api/channel/getChannel/:${channelId}`
				);
				if (res.data) {
					dispatch({ type: SET_CHANNEL, payload: res.data });
				}
			} catch (error) {
				document.location.assign(`/`);
				if (error.response) {
					console.log(error.response.data.error);
					const msg = {
						message: error.response.data.error,
						type: 'danger',
					};
					Seterror(msg);
				}
			}
		}
	};

	const createChannel = async (channel) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				channel.userId = isAuth()._id;
				const res = await axios.post(
					'http://localhost:3001/api/channel/create',
					channel
				);
				if (res.data) {
					document.location.assign(`/chats/${res.data._id}`);
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

	const joinChannel = async (channelData, next) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			try {
				channelData.userId = isAuth()._id;
				const res = await axios.post(
					'http://localhost:3001/api/channel/join',
					channelData
				);
				if (res.data) {
					next();
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

	const getMessageUi = (message) => {
		return (
			<div
				key={message._id}
				className={`chat ${
					isAuth()._id === message.sender._id ? 'me' : 'you'
				}`}>
				<Link to={`/profile/${message.sender.username}`}>
					<span className='name'>{message.sender.name}</span>
				</Link>
				<p className='msg'>{message.message}</p>
				<span className='time'>{getTime(message.createdAt)}</span>
			</div>
		);
	};

	const addNewMsg = (message) => {
		dispatch({ type: ADD_NEW_MESSAGE, payload: message });
	};
	const joinSocket = (socket, id) => {
		dispatch({ type: SOCKET_CONNECTION, payload: socket });
		console.log(socket);
		socket.emit('join-channel', id);
	};

	const sendMessage = async (message, channelId) => {
		const token = getCookie('token');
		if (token) {
			setAuthToken(token);
			const payload = {
				message,
				userId: isAuth() && isAuth()._id,
				channelId,
			};
			try {
				const res = await axios.post(
					'http://localhost:3001/api/channel/message',
					payload
				);
				addNewMsg(res.data);
				console.log('seding message: ');
				state.socket.emit('send-message', res.data);
			} catch (error) {
				if (error.response) {
					const msg = {
						message: error.response.data.error,
						type: 'danger',
					};
					Seterror(msg);
				}
				return false;
			}
		}
	};

	return (
		<ChannelContext.Provider
			value={{
				Channelname: state.Channelname,
				Channel: state.Channel,
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
				getChannelData,
				sendMessage,
				joinSocket,
				getMessageUi,
				addNewMsg,
			}}>
			{props.children}
		</ChannelContext.Provider>
	);
};

export default ChannelState;

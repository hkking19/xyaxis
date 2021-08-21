import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ChatSection from '../../components/Chat/ChatSection/ChatSection';
import ChannelContext from '../../context/channel/ChannelContext';

const socket = io('http://localhost:3001/');

const Chats = () => {
	const channelContext = useContext(ChannelContext);
	const { getChannelData, Channel, joinSocket, addNewMsg, setRecentMessage } =
		channelContext;
	const [channelId, setchannelId] = useState(useParams().channelId)
	useEffect(() => {
		getChannelData(channelId);
		joinSocket(socket, channelId);
		// eslint-disable-next-line no-restricted-globals
	}, [channelId, location.pathname]);

	console.log(channelId);
	useEffect(() => {
		socket.on('received-message', (message) => {
			console.log(`current channel Id${channelId}`);
			console.log(`${message.channelId._id}===${channelId}`);
			if (message.channelId._id === channelId) {
				addNewMsg(message);
			}
			setRecentMessage(message);
		});
	}, [socket, channelId]);
	document.title =
		Channel.channel && Channel.channel.roomname
			? `${Channel.channel.roomname}  |  Xyaxis`
			: `Chats  |  Xyaxis`;
	return (
		<Fragment>
			<ChatSection channelId={channelId} Channel={Channel} />
		</Fragment>
	);
};

export default Chats;

import React, { Fragment, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ChatSection from '../../components/Chat/ChatSection/ChatSection';
import ChannelContext from '../../context/channel/ChannelContext';

const Chats = () => {
	const channelContext = useContext(ChannelContext);
	const { getChannelData, Channel } = channelContext;
	const channelId = useParams().channelId;
	useEffect(() => {
		getChannelData(channelId);
		// eslint-disable-next-line no-restricted-globals
	}, [channelId, location.pathname]);

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

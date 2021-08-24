import React, { useContext, useEffect } from 'react';
import ChannelContext from '../../../../context/channel/ChannelContext';
import './Chat.css';

const Chat = ({ messages }) => {
	const channelContext = useContext(ChannelContext);
	const { getMessageUi, autoScroll } = channelContext;
	useEffect(autoScroll, [autoScroll])

	return (
		<div id='chat-section' className='chat-section customize-scrollbar'>
			{messages && messages.map((message) => getMessageUi(message))}
		</div>
	);
};

export default Chat;

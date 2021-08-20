import React, { useContext } from 'react';
import ChannelContext from '../../../../context/channel/ChannelContext';
import './Chat.css';

const Chat = ({ messages }) => {
	const channelContext = useContext(ChannelContext);
	const { getMessageUi } = channelContext;
	return (
		<div className='chat-section customize-scrollbar'>
			{messages && messages.map((message) => getMessageUi(message))}
		</div>
	);
};

export default Chat;

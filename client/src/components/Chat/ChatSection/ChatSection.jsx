import React, { Fragment } from 'react';
import Chat from './Chat/Chat';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatInput from './ChatInput/ChatInput';
import './ChatSection.css';

const ChatSection = ({ channelId, Channel, socket }) => {
	return (
		<Fragment>
			<ChatHeader channel={Channel.channel} />
			<Chat messages={Channel.messages} />
			<ChatInput channelId={channelId} />
		</Fragment>
	);
};

export default ChatSection;

import React from 'react';
import { isAuth } from '../../../../helpers/auth';
import './Chat.css';

const Chat = ({ messages }) => {
	const userId = isAuth()._id;

	const getMessageUi = (message) => (
		<div
			key={message._id}
			className={`chat ${userId === message.sender._id ? 'me' : 'you'}`}>
			<span className='name'>{message.sender.name}</span>
			<p className='msg'>{message.message}</p>
			<span className='time'>2:5</span>
		</div>
	);
	return (
		<div className='chat-section customize-scrollbar'>
			{messages && messages.map((message) => getMessageUi(message))}
		</div>
	);
};

export default Chat;

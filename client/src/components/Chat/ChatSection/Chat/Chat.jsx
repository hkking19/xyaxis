import React from 'react';
import { Link } from 'react-router-dom';
import { isAuth } from '../../../../helpers/auth';
import { getTime } from '../../../../helpers/time';
import './Chat.css';

const Chat = ({ messages }) => {
	const userId = isAuth()._id;
	const getMessageUi = (message) => (
		<div
			key={message._id}
			className={`chat ${userId === message.sender._id ? 'me' : 'you'}`}>
			<Link to={`/profile/${message.sender.username}`}>
				<span className='name'>{message.sender.name}</span>
			</Link>
			<p className='msg'>{message.message}</p>
			<span className='time'>{getTime(message.createdAt)}</span>
		</div>
	);
	return (
		<div className='chat-section customize-scrollbar'>
			{messages && messages.map((message) => getMessageUi(message))}
		</div>
	);
};

export default Chat;

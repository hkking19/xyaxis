import React from 'react';
import { isAuth } from '../../../../helpers/auth';
import './Chat.css';

const Chat = ({ messages }) => {
	const userId = isAuth().id;
	return (
		<div className='chat-section'>
			{messages &&
				messages.map((message) => (
					<div
						key={message._id}
						className={`chat ${
							userId === message.sender.id ? 'me' : 'you'
						}`}>
						<span className='name'>{message.sender.name}</span>
						<p className='msg'>{message.message}</p>
						<span className='time'>2:5</span>
					</div>
				))}
		</div>
	);
};

export default Chat;

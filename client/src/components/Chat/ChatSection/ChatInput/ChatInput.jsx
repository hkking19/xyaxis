import React, { useState } from 'react';
import axios from 'axios';
import './ChatInput.css';
import { isAuth } from '../../../../helpers/auth';

const ChatInput = ({ channelId }) => {
	const [message, setMessage] = useState('');
	const onInputChange = (e) => {
		setMessage(e.target.value);
	};
	const msgSubmit = async () => {
		const payload = {
			message,
			userId: isAuth() && isAuth()._id,
			channelId,
		};
		const res = await axios.post(
			'http://localhost:3001/api/channel/message',
			payload
		);
	};
	return (
		<div className='chat-input-main'>
			<div className='action-btn'>
				<i className='far fa-smile icon-block' />
				<div className='file-share'>
					<input type='file' />
					<i className='fas fa-paperclip icon-block' />
				</div>
			</div>
			<input
				className='chat-input'
				placeholder='Message'
				onChange={onInputChange}
			/>
			<button className='' onClick={msgSubmit}>
				<i className='fas fa-paper-plane' />
			</button>
		</div>
	);
};

export default ChatInput;

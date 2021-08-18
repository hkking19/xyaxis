import React, { useContext, useEffect, useState } from 'react';
import ChannelContext from '../../../../context/channel/ChannelContext';
import './ChatInput.css';

const ChatInput = ({ channelId }) => {
	const channelContext = useContext(ChannelContext);
	const { sendMessage } = channelContext;
	const [message, setMessage] = useState('');

	useEffect(() => {
		setMessage('');
	}, [channelId]);

	const onInputChange = (e) => {
		setMessage(e.target.value);
	};
	const msgSubmit = () => {
		if (message === '') return;
		sendMessage(message, channelId);
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
				value={message}
			/>
			<button className='' onClick={msgSubmit}>
				<i className='fas fa-paper-plane' />
			</button>
		</div>
	);
};

export default ChatInput;

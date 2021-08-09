import React from 'react';
import './ChatInput.css';

const ChatInput = () => {
	return (
		<div className='chat-form'>
			<div className='action-btn'>
				<i className='far fa-smile icon-block' />
				<div className='file-share'>
					<input type='file' />
					<i className='fas fa-paperclip icon-block' />
				</div>
			</div>
			<input className='chat-input' placeholder='Message' />
		</div>
	);
};

export default ChatInput;

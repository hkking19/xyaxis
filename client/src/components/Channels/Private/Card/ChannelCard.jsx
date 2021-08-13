import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const ChannelCard = ({ channelName, members, channelId }) => {
	return (
		<Link to={`/chats/${channelId}`}>
			<div className='private-channel-card'>
				<div className='img-container'>
					<img
						alt='user-profile'
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGQO5-8CPA9Hzl5_wLkAf6VtlMw52q7IwRw&usqp=CAU'
					/>
				</div>
				<div className='card-detail'>
					<h4 className='title'>{channelName}</h4>
					<p className='desc'>user: latest message</p>
				</div>
				<div className='time'>2:15</div>
			</div>
		</Link>
	);
};

export default ChannelCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { getTime } from '../../../../helpers/time';
import './Card.css';

const ChannelCard = ({ channel }) => {
	return (
		<Link to={`/chats/${channel && channel._id}`}>
			<div className='private-channel-card'>
				<div className='img-container'>
					<img
						alt='user-profile'
						src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDGQO5-8CPA9Hzl5_wLkAf6VtlMw52q7IwRw&usqp=CAU'
					/>
				</div>
				<div className='card-detail'>
					<h4 className='title'>{channel && channel.channelName}</h4>
					<p className='desc'>
						{channel.recentMessage &&
							`${channel.recentMessage.sender.username} : ${channel.recentMessage.message}`}
					</p>
				</div>
				<div className='time'>
					{channel.recentMessage &&
						getTime(channel.recentMessage.createdAt)}
				</div>
			</div>
		</Link>
	);
};

export default ChannelCard;

import React from 'react';
import './ChatHeader.css';

const ChatHeader = ({ channel }) => {
	return (
		<div className='chat-header'>
			<div className='img-container'>
				<img
					alt='chat-profile'
					src='https://www.sheridanross.com/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png'
				/>
				{/* <FontAwesomeIcon className="icon-block" icon={faUser} />  */}
			</div>
			<div className='card-detail'>
				<h4 className='title'>{channel && channel.channelName}</h4>
				<p className='desc'>Online Last seen </p>
			</div>
			<div className='acion-items'>
				<i className='fas fa-ellipsis-h white' />
			</div>
		</div>
	);
};

export default ChatHeader;

import React, { useContext } from 'react'
import ChannelContext from '../../../../context/channel/ChannelContext';
import Button from '../../../Shared/Button/Button';
import './ChannelCard.css';

const ChannelListCard = ({ channelName, members, channelId }) => {
	const channelContext = useContext(ChannelContext);
	const { joinChannel } = channelContext;

	const onClick = () => {
		joinChannel({ channelName }, () => {
			document.location.assign(`/chats/${channelId}`);
		});
	};
	return (
		// <div className='public-channel-card'>
		// <div className='img-container'>
		// 	<img
		// 		alt='channel-profile'
		// 		src='https://www.sheridanross.com/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png'
		// 	/>
		// </div>
		// <div className='content-container'>
		// 	<div className='title-container'>
		// 		<div className='headingWrapper'>
		// 			<h1 className='heading'>{channelName}</h1>
		// 		</div>
		// 		<h4>{members}+ Members</h4>
		// 	</div>
		// </div>
		// <div className='btn-wrapper'>
		// 	<Button
		// 		onClick={onClick}
		// 		text='Join'
		// 		bgColor='rgb(140, 104, 199)'
		// 		color='#fff'
		// 		brRadius='8px'
		// 	/>
		// </div>

		<div className='card1'>
			<div className='title-container'>
				<div className='img-container'>
					<img
						src='https://www.sheridanross.com/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png'
						alt='csvLogo'
					/>
				</div>
				<h3>{channelName}</h3>
			</div>
			<div className='btn-wrapper'>
				<Button
					onClick={onClick}
					text='Join'
					bgColor='rgb(140, 104, 199)'
					color='#fff'
					brRadius='8px'
				/>
			</div>
			<div className='go-corner'>
				<div className='go-arrow'>
					<i className='fas fa-file-csv' />
				</div>
			</div>
		</div>
		// </div>
	);
};

export default ChannelListCard

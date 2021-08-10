import React, { Fragment, useContext, useEffect, useState } from 'react';
import ChannelContext from '../../../context/channel/ChannelContext';
import Loading from '../../Shared/Loading/Loading';
import Title from '../../Title/Title';
import ChannelCard from './Card/ChannelCard';

const PrivateChannel = () => {
	const channelContext = useContext(ChannelContext);
	const { channels, getAllUsersChannels } = channelContext;
	const [PrivateChannels, setPrivateChannels] = useState('waiting');

	useEffect(() => {
		(function () {
			getAllUsersChannels();
			setPrivateChannels(channels);
		})();
	}, []);

	const getChannels = () => {
		if (PrivateChannels === 'waiting') return <Loading />;
		else if (channels <= 0) return 'Nothing Found';
		else
			return channels.length > 0 ? (
				channels.map((channel) => (
					<ChannelCard
						key={channel._id}
						channelName={channel.roomname}
						members={channel.users.length}
					/>
				))
			) : (
				<Loading />
			);
	};

	return (
		<Fragment>
			<Title title='Private Channels' />
			{getChannels()}
		</Fragment>
	);
};

export default PrivateChannel;

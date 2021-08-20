import React, { useContext, useEffect, useState } from 'react';
import ChannelContext from '../../../context/channel/ChannelContext';
import Loading from '../../Shared/Loading/Loading';
import ChannelCard from './Card/ChannelCard';

const PrivateChannel = () => {
	const channelContext = useContext(ChannelContext);
	const { channels, getAllUsersChannels } = channelContext;
	const [PrivateChannels, setPrivateChannels] = useState('waiting');

	useEffect(() => {
		(function () {
			getAllUsersChannels(setPrivateChannels);
		})();
	}, []);

	const getChannels = () => {
		if (PrivateChannels === 'waiting') return <Loading />;
		else if (channels <= 0 && PrivateChannels !== 'waiting')
			return 'Nothing Found';
		else
			return channels.length > 0 ? (
				channels.map((channel) => (
					<ChannelCard key={channel._id} channel={channel} />
				))
			) : (
				<Loading />
			);
	};

	return getChannels();
};

export default PrivateChannel;

import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatSection from '../../components/Chat/ChatSection/ChatSection';
import setAuthToken from '../../Utils/setAuthToken';

const Chats = () => {
	const channelId = useParams().channelId;
	// const [ChannelId, setChannelId] = useState(null)
	// useEffect(() => {

	// },[])

	return (
		<Fragment>
			<ChatSection channelId={channelId} />
		</Fragment>
	);
};

export default Chats;

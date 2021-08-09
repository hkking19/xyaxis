import React, { Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Chat from './Chat/Chat';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatInput from './ChatInput/ChatInput';
import './ChatSection.css';

const renderThumb = ({ style, ...props }) => {
	const thumbStyle = {
		borderRadius: 6,
		backgroundColor: 'rgb(121, 75, 196)',
		position: 'static !important',
	};
	return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props) => (
	<Scrollbars
		renderThumbHorizontal={renderThumb}
		renderThumbVertical={renderThumb}
		{...props}
	/>
);

const ChatSection = () => {
	return (
		<Fragment>
			<ChatHeader />
			<CustomScrollbars
				autoHide
				autoHideTimeout={500}
				autoHideDuration={200}>
				<Chat />
			</CustomScrollbars>
			<ChatInput />
		</Fragment>
	);
};

export default ChatSection;

import React, { useContext, useEffect, useState } from 'react';
import MainCard from '../../Shared/MainCard/MainCard';
import Input from '../../Shared/Input/Input';
import ChannelContext from '../../../context/channel/ChannelContext';

const Search = () => {
	const styles = {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '55px',
		padding: '10px',
	};
	const [inputField, setinputField] = useState('');

	const channelContext = useContext(ChannelContext);
	const { searchChannel, removeSearchChannels, setSearching } =
		channelContext;

	useEffect(() => {
		if (inputField === '') {
			removeSearchChannels();
			setSearching(false);
		}
	}, [inputField]);

	let timer;
	function onInputChange(e) {
		let { value } = e.target;
		value = value.trim();
		if (value === '') {
			removeSearchChannels();
		}
		setinputField(value);
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchChannel(value);
		}, 1000);
	}

	return (
		<div
			style={{
				borderBottom: '1px solid rgb(171, 149, 206)',
				marginBottom: '20px',
				paddingBottom: '10px',
			}}>
			<MainCard styles={styles} title='Search Channel'>
				<Input
					onChange={onInputChange}
					width='350px'
					title='Channel Name'
					placeholder='Search Channel'
					type='text'
					name='channelName'
				/>
			</MainCard>
		</div>
	);
};

export default Search;

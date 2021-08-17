import React, { useContext, useState } from 'react'
import Button from '../../Shared/Button/Button'
import MainCard from '../../Shared/MainCard/MainCard'
import Input from '../../Shared/Input/Input'
import ChannelContext from '../../../context/channel/ChannelContext'

const Create = () => {
    const channelContext = useContext(ChannelContext)
    const {createChannel} = channelContext;
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '150px',
        padding: '15px'
    }
    const [Channel,setChannel] = useState({
        channelName:'',
        public:true
    })
    const handleInputChange = (e) => {
        setChannel({...Channel,[e.target.name]: e.target.value})
    }
    const handleChange = (e) => {
        if(e.target.value === 'public') {
            setChannel({...Channel,public: true})
        } else {
            setChannel({...Channel,public: false})
        }
    }
    const onSubmit = () => {
        if (Channel.channelName === '') return;
        createChannel(Channel)
    }
    return (
		<div>
			<MainCard styles={styles} title='Create New Channel'>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Input
						onChange={handleInputChange}
						title='Channel Name'
						placeholder='Enter Channel Name'
						type='text'
						name='channelName'
					/>
					<select
						value={Channel.public}
						name='channelType'
						onChange={handleChange}>
						<option value='public'>public</option>
						<option value='private'>private</option>
					</select>
				</div>
				<Button
					onClick={onSubmit}
					text='Create'
					bgColor='rgb(140, 104, 199)'
					color='#fff'
					brRadius='8px'
				/>
			</MainCard>
		</div>
	);
}

export default Create

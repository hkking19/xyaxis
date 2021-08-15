import React, { Fragment, useContext } from 'react'
import PublicChannels  from '../../components/Channels/Public/ChannelList/PublicChannels'
import Create from '../../components/Channels/Create/Create'
import Search from '../../components/Channels/Search/Search'
import Title from '../../components/Title/Title'
import './Home.css'
import ErrorContext from '../../context/error/ErrorContext'
import Alert from '../../components/Shared/Alert/Alert'


const Home = () => {
    document.title = 'Home | Xyaxis';
    const errorContext = useContext(ErrorContext)
    const {error} = errorContext;
    return (
        <Fragment>
        <div className='mid_home-main'>
            {error.message && <Alert message={error.message} type={error.type}/>}
            <Create />
           <Title title='Public Channels' />
           <Search />
           <PublicChannels />
        </div>
        </Fragment>
    )
}

export default Home

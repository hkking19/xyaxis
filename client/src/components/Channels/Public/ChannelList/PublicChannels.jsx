import React, { Fragment, useContext, useEffect } from 'react'
import ChannelContext from '../../../../context/channel/ChannelContext'
import Loading from '../../../Shared/Loading/Loading'
import ChannelListCard from '../Card/ChannelListCard'


const PublicChannels = () => {
    const channelContext = useContext(ChannelContext)
    const {publicChannels,getAllPublicChannels,searchedChannels,searching} = channelContext;
    useEffect(() => {
        getAllPublicChannels()
    },[getAllPublicChannels])

    const getChannels = () => {
        if(typeof searchedChannels !== 'string' && searchedChannels.length > 0) {
            return searchedChannels;
        }
        else if(searching) return [];
        else return publicChannels;
    }

    const getList = () => {
        if(typeof searchedChannels === 'string') {
            return searchedChannels
        } else {
            return (
                getChannels().length > 0 ?  (getChannels().map(channel => (
                    <ChannelListCard key={channel._id} channelName={channel.roomname} members={channel.users.length} />
                ))) : <Loading />
            )
        }
    }

    return (
        <Fragment>
            {
                getList()
            }
        </Fragment>
    )
}

export default PublicChannels;
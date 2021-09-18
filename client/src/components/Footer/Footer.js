import React from 'react'
import './Footer.css'

const Footer = () => {
    const streamer = false;
    return (
        <div className='footer'>
            {streamer && (
                <div className='media'>
                    <p>Mic</p>
                    <p>Camera</p>
                </div>
            )}
            <p>Exit Quietly</p>
        </div>
    )
}

export default Footer

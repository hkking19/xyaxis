import React from 'react'
import './Footer.css'

const Footer = () => {
    const hi = 'hi';
    console.log(hi)
    return (
        <div className='footer'>
            <p>Go To Stage</p>
            <div className='media'>
                <p>Mic</p>
                <p>Camera</p>
            </div>
            <p>Exit Quietly</p>
        </div>
    )
}

export default Footer

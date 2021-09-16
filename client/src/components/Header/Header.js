import React from 'react'
import Logo from '../Shared/Logo/Logo';
import './Header.css';

const Header = () => {
    const hi = 'Header';
    console.log(hi)
    return (
        <div className='header'>
            <Logo styles={{}} />
            <div className='user'>
                <p>Hello, Harshal Kaigaonkar</p>
            </div>
        </div>
    )
}

export default Header

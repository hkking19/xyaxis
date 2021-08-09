import React from 'react'
import './Header.css'

const Header = ({pageName,hidden}) => {
    if(hidden) {
        return (
            <></>
        )
    }
    else return (
        <div className={`mid_header-main ${hidden}`}>
            <h4 className='header-title'>{pageName}</h4>
        </div>
    )
}

export default Header

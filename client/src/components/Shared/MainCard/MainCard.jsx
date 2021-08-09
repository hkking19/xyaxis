import React from 'react'
import './MainCard.css'

const MainCard = ({children,styles}) => {
    return (
        <div  className='main-card' style={styles}>
            {children}
        </div>
    )
}

export default MainCard

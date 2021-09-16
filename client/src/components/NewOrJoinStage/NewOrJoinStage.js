import React from 'react';
import Header from '../Header/Header';
import './NewOrJoinStage.css';

const NewOrJoinStage = () => {
    const hi = 'hi';
    console.log(hi)
    return (
        <>
            <Header />
            <div className='container'>
                <div className='semiContainer'>
                    <input type='text' placeholder='Stage Code' />
                    <div className='semi-container'>
                        <button type='submit'>Create A New Stage</button>
                        <button type='submit'>Join Stage as Audience</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewOrJoinStage;

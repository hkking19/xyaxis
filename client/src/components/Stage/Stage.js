/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Stage.css';

const Stage = () => {
    const [Audience, setAudience] = useState([])
    const streamerVideo = useRef();
    useEffect(async () => {
        setAudience([
            {
                name:"hello"
            },
            {
                name:"2"
            },
            {
                name:"4"
            },
            {
                name:"5"
            },
            {
                name:"hello"
            },
            {
                name:"hello"
            },
        ])
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamerVideo.current.srcObject = stream;
    }, [])

    return (
        <div>
            <Header />
            <div className='field'>
                <p className='head'>Stage</p>
                <div className='Stage'>
                    <video id="vid" autoPlay ref={streamerVideo}>
                        <track kind="captions" default/>
                    </video>
                </div>
                <hr />
                <p className='head'>Audience</p>
                <div className='Audience'>
                    {Audience.map(data => <p>{data.name}</p>)}
                </div>
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </div>
    )
};

export default Stage;

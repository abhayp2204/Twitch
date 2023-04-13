import React, { useState, useEffect, useRef } from 'react'
import '../css/Video.css'
import io from 'socket.io-client'

function Video(props) {
    const [message, setMessage] = useState('')


    return (
        <div className='video-container'>
            <div className='video-player'>
                <iframe src={props.room.url}  allow="autoplay; encrypted-media" allowFullScreen></iframe>
                {/* <video className='video-player' src={props.room.url} ref={videoRef} onPlay={handlePlay} onPause={handlePause} onSeeked={handleSeek} /> */}
            </div>
            <div className='room-info'>
                <div className='room-title'>{props.room.label}</div>
                <div className='room-description'>{props.room.desc}</div>
            </div>
        </div>
    )
}

export default Video
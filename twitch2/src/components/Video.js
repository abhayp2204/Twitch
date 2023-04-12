import React, { useState } from 'react'
import '../css/Video.css'

function Video(props) {
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/6fm-uj8E8lI')

    return (
        <div className='video-container'>
            <div className='video-player'>
                <iframe src={videoUrl}  allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <div className='room-info'>
                <div className='room-title'>{props.room.label}</div>
                <div className='room-description'>{props.room.desc}</div>
            </div>
        </div>
    )
}

export default Video
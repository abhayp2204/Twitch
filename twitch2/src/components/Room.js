import React, { useState, useContext } from 'react'
import Chat from './Chat'
import { UserContext } from '../App'
import '../css/Room.css'

function Room(props) {
    const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ')
    console.log("props = ",     props)
    console.log("props room = ", props.room)

    return (
        <div className='room'>
        <Chat user={props.user} />
        <div className='video-container'>
            <iframe src={videoUrl}  allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div className='room-info'>
            <div className='room-title'>{props.room.label}</div>
            <div className='room-description'>{props.room.desc}</div>
        </div>
        </div>
    )
}

export default Room

import React, { useState, useContext } from 'react'
import Chat from './Chat'
import { UserContext } from '../App'
import '../css/Room.css'

function Room(props) {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ')

  return (
    <div className='room'>
      <Chat user={props.user} />
      <div className='video-container'>
        <iframe src={videoUrl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  )
}

export default Room

import React from 'react'
import '../css/Room.css'
import Panel from './Panel'
import Navbar from './Navbar'
import Video from './Video'
import Chat from './Chat'

function Room(props) {
    return (
        <div className='room'>
            <Navbar />
            <Panel />
            <Video room={props.room} />
            <Chat room={props.room}/>
        </div>
    )
}

export default Room
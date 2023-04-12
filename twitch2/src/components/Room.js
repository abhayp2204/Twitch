import React from 'react'
import Chat from './Chat'
import '../css/Room.css'
import Panel from './Panel'
import Navbar from './Navbar'
import Video from './Video'

function Room(props) {
    console.log("props = ",     props)
    console.log("props room = ", props.room)

    return (
        <div className='room'>
            <Navbar />
            <Panel />
            <Video room={props.room} />
            <Chat user={props.user} />
        </div>
    )
}

export default Room
import React from 'react'
import rooms from '../data/rooms'
import '../css/Panel.css'
import { Link } from 'react-router-dom'

function Panel() {
    const url = window.location.href
    const currentRoom = url.substring(url.lastIndexOf('/') + 1)
    console.log("Current room: " + currentRoom)

    return (
        <div className='panel'>
            <div className='panel-title'>Rooms</div>
            <div className='panel-rooms'>
                {rooms.map((room) => (
                    console.log(room.value),
                    <Link
                        to={`http://localhost:3000/${room.value}`}
                        className={`panel-room ${room.value === currentRoom? 'active' : ''}`}
                        key={room.value}
                    >
                        {room.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Panel
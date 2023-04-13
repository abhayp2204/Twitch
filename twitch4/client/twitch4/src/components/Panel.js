import React from 'react'
import rooms from '../data/rooms'
import '../css/Panel.css'

function Panel() {
    return (
        <div className='panel'>
            {rooms.map((room) => (
                <div className="panel-room" key={room.value}>{room.label}</div>
            ))}
        </div>
    )
}

export default Panel
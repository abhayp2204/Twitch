import React, { useState, useContext } from 'react'
import Chat from './Chat'

import { UserContext } from '../App'

function Room(props) {
    return (
        <div className='room'>
            <Chat user={props.user} />
        </div>
    )
}

export default Room
import React, { useState, useContext } from 'react'
import Chat from './Chat'

import { UserContext } from '../App'

function Room(props) {
    console.log(props.user)
    return (
        <div className='room'>
            <Chat />
        </div>
    )
}

export default Room
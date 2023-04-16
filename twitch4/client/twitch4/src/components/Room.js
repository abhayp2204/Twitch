import React, { useState, useEffect } from 'react'
import '../css/Room.css'
import Panel from './Panel'
import Navbar from './Navbar'
import Video from './Video'
import Chat from './Chat'

function Room(props) {
    const [smallWindow, setSmallWindow] = useState(false)


    // event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', () => {
            console.log(window.innerWidth)

            if (window.innerWidth < 1000) {
                setSmallWindow(true)
                console.log("Panel hidden")
            }
            else {
                setSmallWindow(false)
                console.log("Panel shown")
            }
        })

        return () => {
            window.removeEventListener('resize', () => {
                console.log('window resized')
            })
        }
    }, [])
    
    return (
        <div className='room'>
            <Navbar />
            <div className='room-elements'>
                {!smallWindow && <Panel />}
                <Video room={props.room} />
                <Chat room={props.room}/>
            </div>
        </div>
    )
}

export default Room
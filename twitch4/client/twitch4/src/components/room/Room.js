import React, { useState, useEffect } from 'react'
import '../../css/Room.css'
import Panel from './Panel'
import Navbar from './Navbar'
import Video from './Video'
import Chat from '../chat/Chat'

// firebase
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase';
import { Link } from 'react-router-dom'

function Room(props) {
    const [smallWindow, setSmallWindow] = useState(false)
    const roomsRef = firestore.collection('rooms')
    const [rooms] = useCollectionData(roomsRef, { idField: 'value' })

    console.log("Room props = ", props.rooms)


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
                <div className='room-display'>

                    
                    {!smallWindow && <Panel rooms={props.rooms} />}


                    <div className='custom-room-container'>
                        <div className='custom-room-title'>Custom Rooms</div>
                        {props.rooms && props.rooms.map((room) => (
                            <Link to={`http://localhost:3000/${room.value}`} key={room.value} className='custom-room'>{room.label}</Link>
                        ))}
                    </div>


                </div>
                <Video room={props.room} />
                <Chat room={props.room}/>
            </div>
        </div>
    )
}

export default Room
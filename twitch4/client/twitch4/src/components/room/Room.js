import Navbar from './Navbar'
import Video from './Video'
import Chat from '../chat/Chat'
import React, { useState, useEffect } from 'react'
import Panel from './Panel'
import '../../css/Room.css'


// firebase
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase';
import { Link } from 'react-router-dom'

// Bootstrap
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';


function Room(props) {
    const [smallWindow, setSmallWindow] = useState(false)
    const roomsRef = firestore.collection('rooms')
    const [rooms] = useCollectionData(roomsRef, { idField: 'value' })
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);


    const askPassword = (e, password) => {
    }

    const handleClose = () => {
        setShow(false);
        setSelectedRoom(null);
      };
    
      const handleShow = (room) => {
        setSelectedRoom(room);
        setShow(!show);
      };

    const handleChange = (e) => {
        setPassword(e.target.value);
    }


    const handleSaveChanges = () => {
        const originalPassword = selectedRoom.password;
        if (password === originalPassword) {
            // Add your logic for handling correct password here
            window.location.href = `/${selectedRoom.value}`;
            // $(`#${selectedRoom.value}`).click();
        } 
        else {
            // Add your logic for handling incorrect password here
        }
        handleClose();
    };


    // event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1000) {
                setSmallWindow(true)
            }
            else {
                setSmallWindow(false)
            }
        })
        return () => {
            window.removeEventListener('resize', () => {})
        }
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveChanges();
        }
    }

return (
    <div className='room'>
        <Navbar />
        <div className='room-elements'>
            <div className='room-display'>
                {!smallWindow && <Panel rooms={props.rooms} />}


                <div className='custom-room-container'>
                <div className='custom-room-title'>Custom Rooms</div>
                {props.rooms && props.rooms.map((room) => (
                    <React.Fragment key={room.value}>
                    <div
                        className='custom-room'
                        onClick={() => handleShow(room)}
                    >
                        {room.label}

                        {show && selectedRoom && selectedRoom.value === room.value && (
                        <div className="modal">
                            <div className="modal-content">
                                <input
                                    className='modal-input'
                                    type="password"
                                    placeholder="Password"
                                    autoFocus
                                    value={password}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                        </div>
                    </div>
                )}
            </div>
    
                </React.Fragment>
                ))}
            </div>


            </div>
            <Video room={props.room} />
            <Chat room={props.room}/>
        </div>
    </div>
    )
}

export default Room
import React, { useState, createContext, useEffect } from 'react';
import "../../css/Home.css";
import { Link } from "react-router-dom"
import rooms from "../../data/rooms";
import SignOut from '../auth/SignOut';
import Profile from './Profile';
import io from 'socket.io-client'

// Firebase
import firebase from "firebase/compat/app"
import { auth, firestore } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"




function Home(props) {
    const socket = io.connect('http://localhost:3001')
    const [nickname, setNickname] = useState('');
    const [room, setRoom] = useState(rooms[0].value);
    const [customRoomChecked, setCustomRoomChecked] = useState(false);
    const [customRoom, setCustomRoom] = useState('');
    const [customRoomDesc, setCustomRoomDesc] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [showCustomRoomFields, setShowCustomRoomFields] = useState(false);    
    const roomsRef = firestore.collection('rooms');


    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };

    const handleCustomRoomChange = (event) => {
        setCustomRoom(event.target.value);
    };

    const handleJoinChat = (event) => {
        event.preventDefault();
        window.location.href = 'http://localhost:3000/';
    };

    const handleCreateRoom = async (event) => {
        event.preventDefault();
        if (customRoom.trim() === '') return;
        const newRoom = {
            label: customRoom,
            value: customRoom.toLowerCase(),
            desc: customRoomDesc,
            origurl: youtubeUrl,
            url: youtubeUrl.replace('watch?v=', 'embed/'),
            videoId: youtubeUrl.replace('https://www.youtube.com/watch?v=', ''),
        };
        await roomsRef.add(newRoom);
        setRoom(newRoom.value);
        setCustomRoom('');
    };

    const handleJoinRoom = (event) => {
        socket.emit('join', {
            name: props.user.displayName,
            room: room,
        })
    }

    return (    
        <form onSubmit={handleJoinChat}>
            <div className='title'>Twitchy</div>
            <div className='welcome'>Welcome back {props.user.displayName}!<br />Select your room</div>
            <br />
            <label>
                Room
                <select value={room} onChange={handleRoomChange}>
                    {rooms.map((room) => (
                        <option key={room.value} value={room.value} desc={room.desc}>{room.label}</option>
                    ))}
                </select>
            </label>
            <br />
            <label className='checkbox-container'>
                <div className='checkbox-label'>Custom Room</div>
                <input
                    className='checkbox'
                    type="checkbox"
                    checked={customRoomChecked}
                    onChange={() => setCustomRoomChecked(!customRoomChecked)}
                />
            </label>
            {customRoomChecked && (
                <>
                    <label>
                        Custom Room Name
                        <input
                            type="text"
                            value={customRoom}
                            onChange={handleCustomRoomChange}
                        />
                    </label>
                    <br />
                    <label>
                    Description
                        <textarea
                            className='desc-input'
                            value={customRoomDesc}
                            onChange={(e) => setCustomRoomDesc(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        YouTube URL
                        <input
                            type="text"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                        />
                    </label>
                    <button className="create-room" onClick={handleCreateRoom}>Create Room</button>
                </>
            )}
            <Link className="link-button-fancy-3" to={room} onClick={handleJoinRoom}>
                Join Room
            </Link>
            <Profile user={props.user} />
        </form>
    );
}

export default Home;
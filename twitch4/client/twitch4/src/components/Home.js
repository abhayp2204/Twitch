import React, { useState, createContext, useEffect } from 'react';
import "../css/Home.css";
import { Link } from "react-router-dom"
import rooms from "../data/rooms";
import SignOut from './SignOut';
import Profile from './Profile';
import io from 'socket.io-client'




function Home(props) {
    const [nickname, setNickname] = useState('');
    const [room, setRoom] = useState(rooms[0].value);
    const [customRoom, setCustomRoom] = useState('');

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




    return (    
        <form onSubmit={handleJoinChat}>
            <div className='title'>Twitchy</div>
            <div className='welcome'>Welcome back {props.user.displayName}!<br />Select your nickname and room</div>
            <label>
                Nickname
                <input type="text" value={nickname} onChange={handleNicknameChange} />
            </label>
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
            <label>
                Custom Room
                <input type="text" value={customRoom} onChange={handleCustomRoomChange} />
            </label>
            <Link className="link-button-fancy-3" to={room}>
                Join Room
            </Link>
            <Profile user={props.user} />
        </form>
    );
}

export default Home;

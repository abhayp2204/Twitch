import React, { useState } from 'react';
import "../css/Home.css";
import { Link } from "react-router-dom"

function Home() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [customRoom, setCustomRoom] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };

    const handleCustomRoomChange = (event) => {
        setCustomRoom(event.target.value);
    };

    const handleJoinChat = (event) => {
        event.preventDefault();
        alert("Joining Room: " + room);
        window.location.href = 'http://localhost:3000/room';
    };

    return (
        <form onSubmit={handleJoinChat}>
            <div className='title'>Twitch</div>
            <label>
                Username
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                Room
                <select value={room} onChange={handleRoomChange}>
                    <option value="room1">Valorant</option>
                    <option value="room2">Movies</option>
                    <option value="room3">Tutorials</option>
                    <option value="room3">GeoGuesser</option>
                </select>
            </label>
            <br />
            <label>
                Custom Room
                <input type="text" value={customRoom} onChange={handleCustomRoomChange} />
            </label>
            <Link className="link-button-fancy-3" to="room">
                Join Room
            </Link>
        </form>
    );
}

export default Home;

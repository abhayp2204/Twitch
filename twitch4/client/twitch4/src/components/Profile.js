import React, { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { firestore, auth } from "../firebase"
import { v4 } from "uuid"
import "../css/Profile.css"

import SignOut from "./SignOut"

const favoriteRooms = [
    {id: 0, room: "Skyrim"},
    {id: 1, room: "Runescape"},
    {id: 2, room: "Valorant"},
]

function Profile(props) {
    console.log(props.user.photoURL)
    return (
		<div className="profile-container">
            <img src={props.user.photoURL} alt="profile" referrerPolicy="no-referrer"/>

            <div className="profile-info">
                <div className="profile-name">{props.user.displayName}</div>
                <div className="profile-email">{props.user.email}</div>
            </div>

            <div className="profile-favorite-rooms">
                <div className="profile-favorite-rooms-title">Favorite Rooms</div>
                <div className="profile-favorite-rooms-list">
                    {favoriteRooms.map((room, key) => (
                        <div className="profile-favorite-room" key={room.id}>{room.room}</div>
                    ))}
                </div>
            </div>
            <SignOut />
        </div>
	)
}

export default Profile
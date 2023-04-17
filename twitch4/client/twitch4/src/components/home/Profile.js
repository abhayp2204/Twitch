import React, { useEffect, useState } from "react"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { firestore, auth } from "../../firebase"
import { v4 } from "uuid"
import "../../css/Profile.css"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Link } from "react-router-dom"

import SignOut from "../auth/SignOut"

const favoriteRooms = [
    {id: 0, room: "Skyrim"},
    {id: 1, room: "Runescape"},
    {id: 2, room: "Valorant"},
]

function Profile(props) {
    console.log(props.user.photoURL)

    // get user's favorite rooms
    const favoriteRef = firestore.collection('favorite')
    const [favoritesData] = useCollectionData(favoriteRef, { idField: 'id' })
    const favorites = favoritesData?.filter((favorite) => favorite.user === auth.currentUser.uid).map((favorite) => favorite)



    return (
		<div className="profile-container">
            <img
                src={props.user.photoURL}
                alt="profile"
                referrerPolicy="no-referrer"
            />

            <div className="profile-info">
                <div className="profile-name">{props.user.displayName}</div>
                <div className="profile-email">{props.user.email}</div>
            </div>

            <div className="profile-favorite-rooms">
                <div className="profile-favorite-rooms-title">Favorite Rooms</div>
                <div className="profile-favorite-rooms-list">
                    {(favorites?.length === 0) && <div className="profile-favorite-rooms-empty">Empty</div>}
                    {favorites?.map((room, key) => (
                        <Link to={`/${room.room}`} className="profile-favorite-room" key={room.id}>{room.roomLabel}</Link>
                    ))}
                </div>
            </div>
            <SignOut />
        </div>
	)
}

export default Profile
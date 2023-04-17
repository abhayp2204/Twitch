import React from 'react'
import rooms from '../../data/rooms'
import '../../css/Panel.css'
import { Link } from 'react-router-dom'
import firebase from "firebase/compat/app"
import { auth, firestore } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

function Panel() {
    const url = window.location.href
    const currentRoom = url.substring(url.lastIndexOf('/') + 1)
    const favoriteRef = firestore.collection('favorite')

    const addFavorite = async(e) => {
        e.preventDefault()

        // if already in favorites, remove from favorites
        if(favorites?.includes(currentRoom)) {
            const favoriteSnapshot = await favoriteRef.where('room', '==', currentRoom).get();
            favoriteSnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            return;
        }

        await favoriteRef.add({
            room: currentRoom,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    // get list of rooms in favorites
    const [favoritesData] = useCollectionData(favoriteRef, { idField: 'id' })
    const favorites = favoritesData?.map((favorite) => favorite.room)
    console.log(favorites)


    return (
        <div className='panel'>
            <div className='panel-title'>Rooms</div>
            <div className='panel-rooms'>
                {rooms.map((room) => (
                    <Link
                        to={`http://localhost:3000/${room.value}`}
                        className={
                            `panel-room
                            ${room.value === currentRoom? 'active' : ''}
                            ${favorites?.includes(room.value)? 'favorite' : ''}`
                        }
                        key={room.value}
                        onDoubleClick={addFavorite}
                    >
                        {room.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Panel
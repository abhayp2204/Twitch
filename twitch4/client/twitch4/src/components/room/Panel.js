import React from 'react'
import rooms from '../../data/rooms'
import '../../css/Panel.css'
import { Link } from 'react-router-dom'
import firebase from "firebase/compat/app"
import { auth, firestore } from "../../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import io from 'socket.io-client'

function Panel(props) {
    const socket = io.connect('http://localhost:3001')
    const url = window.location.href
    const currentRoom = url.substring(url.lastIndexOf('/') + 1)
    const filter = rooms.filter((room) => room.value === currentRoom)


    const currentRoomLabel = filter.length  === 0?
        props.rooms.filter((room) => room.value === currentRoom)[0].label :
        rooms.filter((room) => room.value === currentRoom)[0].label
        
    const favoriteRef = firestore.collection('favorite')

    const addFavorite = async(e) => {
        e.preventDefault()

        // if already in favorites, remove from favorites
        if(favoriteRooms?.includes(currentRoom)) {
            const favoriteSnapshot = await favoriteRef.where('room', '==', currentRoom).get();
            favoriteSnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            return;
        }

        await favoriteRef.add({
            room: currentRoom,
            roomLabel: currentRoomLabel,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user: auth.currentUser.uid
        })
    }

    const handleChangeRoom = (room) => {
        console.log('room', room)
        console.log('currentRoom', currentRoom)

        if( room === currentRoom) return


        socket.emit('change-room', {
            newRoom: room,
            prevRoom: currentRoom,
            name: auth.currentUser.displayName
        })
    }



    // get list of rooms in favorites
    const [favorites] = useCollectionData(favoriteRef, { idField: 'id' })
    const favoriteRooms = favorites?.map((fav) => fav.room)


    return (
        <div className='panel'>
            <div className='panel-title'>Rooms</div>
            <div className='panel-favorites'>
                {favorites?.map((room) => (
                    <Link
                        to={`http://localhost:3000/${room.room}`}
                        key={room.room}
                        className={`panel-favorite ${(room.room === currentRoom ? 'panel-favorite-active' : '')}`}
                        onDoubleClick={addFavorite}
                    >
                        {room.roomLabel}
                    </Link>
                ))}
            </div>
            <div className='panel-rooms'>
                {rooms
                    .filter((room) => !favorites?.some((fav) => fav.room === room.value))
                    .map((room) => (
                    <Link
                        to={`http://localhost:3000/${room.value}`}
                        className={`panel-room ${room.value === currentRoom ? 'panel-room-active' : ''}`}
                        key={room.room}
                        onClick={() => handleChangeRoom(room.label)}
                    >
                        {room.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Panel
import io from 'socket.io-client';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from './firebase';

// components
import SignIn from './components/SignIn';
import Home from './components/Home';
import Room from './components/Room';
import rooms from './data/rooms';

const socket = io('http://localhost:3001');

function App() {
    const [user] = useAuthState(auth);

    // const sendMessage = () => {
    //     console.log('CLIENT: Sending message...');
    //     socket.emit('message', {message: 'Hello from client'});
    // };

    // useEffect(() => {
    //     socket.on('receive-message', (data) => {
    //         console.log('CLIENT: received broadcast from server: ' + data.message);
    //         alert(data.message)
    //     });
    // }, [socket]);


    if(!user) {
        return (
            <SignIn />
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                {rooms.map((room) => (
                    <Route
                        key={room.value}
                        path={`/${room.value}`}
                        element={<Room
                                    room={room}
                                    user={user}
                                />}
                    />
                ))}
            </Routes>
        </Router>
    );
}

export default App;

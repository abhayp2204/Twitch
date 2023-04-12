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
import SignOut from './components/SignOut';
import ChatRoom from './components/Chat';
import Home from './components/Home';
import Room from './components/Room';
import rooms from './data/rooms';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [user] = useAuthState(auth);

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
                    <Route key={room.value} path={`/${room.value}`} element={<Room room={room} user={user} />} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;

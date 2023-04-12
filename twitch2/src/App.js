// React
import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./css/App.css"

// Components
import Home from "./components/Home"
import Room from "./components/Room"
import rooms from "./data/rooms"

// Firebase
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth"

function App() {
    const [user2, setUser2] = useState("")

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home setUser={setUser2}/>} />
                {rooms.map((room) => (
                    <Route key={room.value} path={`/${room.value}`} element={<Room room={room} user={user2} />} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;

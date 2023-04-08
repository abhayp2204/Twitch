// React
import React, { useState, createContext } from "react"
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom"
import "./css/App.css"

// Components
import Home from "./components/Home"
import Room from "./components/Room"

import rooms from "./data/rooms"

function App() {
    const [user, setUser] = useState("")

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home setUser={setUser}/>} />
                {rooms.map((room) => (
                    <Route key={room.value} path={`/${room.value}`} element={<Room room={room} user={user} />} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;

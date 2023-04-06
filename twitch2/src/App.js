// React
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./css/App.css"

// Components
import Home from "./components/Home"
import Room from "./components/Room"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room" element={<Room />} />
            </Routes>
        </Router>
    );
}

export default App;

// React
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./css/App.css"

// Components
import Home from "./components/Home"
import Room from "./components/Room"

function App() {
    const express = require('express');
    // const cors = require('cors');
    // const app = express();
    // app.use(cors());

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

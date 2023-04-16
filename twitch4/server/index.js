const express = require('express')
const app = express()
const http = require("http")
const { Server } = require("socket.io")

// CORS middleware
const cors = require('cors')
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Message event
    socket.on('message', (data) => {
        console.log('SERVER: Message received from client: ' + data.message);
        socket.broadcast.emit('receive-message', data);
    })

    // Play event
    socket.on('play', (data) => {
        console.log('SERVER: ' + data.room + ' is playing at ' + data.time);
        socket.broadcast.emit('play-alert', data);
    })

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected: ' + socket.id);
    })
})

server.listen(3001, () => {
    console.log('listening on port:3001');
})
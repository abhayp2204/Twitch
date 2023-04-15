import React, { useEffect } from 'react'
import '../css/Video.css'
import io from 'socket.io-client'
import YouTube from 'react-youtube'

function Video(props) {
    const socket = io.connect('http://localhost:3001')

    const handlePlay = (event) => {
        console.log("play")
        socket.emit('play', {room: props.room.label, time: event.target.getCurrentTime()})
    }

    const handleStateChange = (event) => {
        return
        console.log("state change")
        const state = event.target.getPlayerState()

        if (state === YouTube.PlayerState.PLAYING) {
            console.log("playing")
            const currentTime = event.target.getCurrentTime()
            console.log(currentTime)
        }
    }

    const sendMsg = () => {
        socket.emit('message', {message: 'Hello from client'})
    }
    

    useEffect(() => {
        console.log("Listening for play-alert")
        socket.on('play-alert', (data) => {
            console.log("play alert received from SERVER")
        })
    }, [])

    
    return (
        <div className='video-container'>
            <button onClick={sendMsg}>Send Message</button>
            <YouTube
                className='youtube-player'
                videoId='OkFdqqyI8y4'
                onPlay={handlePlay}
                onStateChange={handleStateChange}
                opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                      autoplay: 1,
                    },
                }}
            />
            <div className='room-description'>
                <div className='room-title'>{props.room.label}</div>
                <div className='room-desc'>{props.room.desc}</div>
            </div>
        </div>
    )
}

export default Video
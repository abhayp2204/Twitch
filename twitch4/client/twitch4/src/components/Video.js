import React, { useState, useEffect } from 'react'
import '../css/Video.css'
import io from 'socket.io-client'
import YouTube from 'react-youtube'

function Video(props) {
    const socket = io.connect('http://localhost:3001')
    const [playerReady, setPlayerReady] = useState(false)
    const [playTime, setPlayTime] = useState(0)
    const [opts, setOpts] = useState({height: '100%', width: '100%', playerVars: {autoplay: 0, start: 0}})
    const [key, setKey] = useState(0)

    // generate unique id
    const generateId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    // const handleReady = (event) => {
    //     setPlayerReady(true)

    //     if (playTime !== 0 && playerReady) {
    //         event.target.seekTo(playTime)
    //         setPlayTime(0)
    //     }
    // }

    const handlePlay = (event) => {
        console.log("CLIENT: (play event): time = " + event.target.getCurrentTime())
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
            console.log("CLIENT: (play-alert event): room = " + data.room + ", time = " + data.time)

            // play video in this room at the time specified 
            console.log("seeking to " + data.time)
        })

        socket.on('receive-message', (data) => {
            // start video
            console.log("STARTING VIDEO")
            setKey(generateId())
            setOpts({height: '100%', width: '100%', playerVars: {autoplay: 1, start: 0}})
        })

        return () => {
            socket.off('play-alert')
            socket.off('receive-message')
        }
    }, [opts])

    
    return (
        <div className='video-container'>
            <button onClick={sendMsg}>Set Player</button>
            <YouTube
                key={key}
                className='youtube-player'
                videoId='OkFdqqyI8y4'
                onPlay={handlePlay}
                // onPause={handlePause}
                // onReady={handleReady}
                onStateChange={handleStateChange}
                opts={opts}
            />
            <div className='room-description'>
                <div className='room-title'>{props.room.label}</div>
                <div className='room-desc'>{props.room.desc}</div>
            </div>
        </div>
    )
}

export default Video
import React, { useEffect } from 'react'
import '../css/Video.css'
import io from 'socket.io-client'
import YouTube from 'react-youtube'

function Video(props) {
    const socket = io()

    const handleReady = (event) => {
        console.log("ready")
    }

    const handlePlay = (event) => {
        console.log("play")
    }

    const handlePause = (event) => {
        console.log("pause")
    }
    

    useEffect(() => {
        console.log("Listening for play-alert")
        socket.on('play-alert', (data) => {
            console.log("alerting")
            alert(data)
        })
    }, [])

    
    return (
        <div className='video-container'>
            <div className='video-player'>
                {/* <iframe
                    // src={props.room.url + '?start=10&autoplay=0'}
                    ref={frameRef}
                    allow="autoplay; encrypted-media"
                    onLoad={handleLoad}
                    onPlay={handlePlay}
                    allowFullScreen>
                </iframe> */}
                <YouTube
                    videoId='OkFdqqyI8y4'
                    onReady={handleReady}
                    onPlay={handlePlay}
                    onPause={handlePause}
                />
            </div>
            <div className='room-info'>
                <div className='room-title'>{props.room.label}</div>
                <div className='room-description'>{props.room.desc}</div>
            </div>
        </div>
    )
}

export default Video
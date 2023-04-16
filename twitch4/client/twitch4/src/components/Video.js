import React, { useState, useEffect } from 'react'
import '../css/Video.css'
import io from 'socket.io-client'
import YouTube from 'react-youtube'
import { auth } from '../firebase'

function Video(props) {
    const socket = io.connect('http://localhost:3001')
    const [key, setKey] = useState(0)
    const [opts, setOpts] = useState({
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            start: 0
        }
    })

    console.log(auth.currentUser.displayName === 'apple pie')

    // generate unique id
    const generateId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }


    const handlePlay = (event) => {
        console.log("CLIENT: (play event): time = " + event.target.getCurrentTime())
        if (auth.currentUser.displayName !== 'apple pie') return
        socket.emit('play', {
            room: props.room.label,
            time: event.target.getCurrentTime(),
            user: auth.currentUser,
        })
    }

    const handlePause = (event) => {
        console.log("CLIENT: (pause event): time = " + event.target.getCurrentTime())
        if (auth.currentUser.displayName !== 'apple pie') return
        socket.emit('pause', {
            room: props.room.label,
            time: event.target.getCurrentTime(),
            user: auth.currentUser,
        })
    }

    const sendMsg = () => {
        socket.emit('message', {
            message: 'Hello from client',
            user: auth.currentUser,
        })
    }
    

    useEffect(() => {
        console.log("Listening for play-alert")
        socket.on('play-alert', (data) => {
            if (data.user.displayName === auth.currentUser.displayName) return
            
            console.log("CLIENT: (play-alert event): room = " + data.room + ", time = " + data.time)

            // play video in this room at the time specified 
            console.log("SHARK seeking to " + data.time)

            setKey(generateId())
            setOpts({
                height: '100%',
                width: '100%',
                playerVars: {
                    autoplay: 1,
                    start: Math.floor(data.time),
                }
            })
        })

        socket.on('pause-alert', (data) => {
            if (data.user.displayName === auth.currentUser.displayName) return

            console.log("CLIENT: (pause-alert event): room = " + data.room + ", time = " + data.time)

            setKey(generateId())
            setOpts({
                height: '100%',
                width: '100%',
                playerVars: {
                    autoplay: 0,
                    start: data.time,
                }
            })
        })


        socket.on('receive-message', (data) => {
            if (data.user.displayName === auth.currentUser.displayName) return

            // start video
            console.log("STARTING VIDEO")
            setKey(generateId())
            setOpts({height: '100%', width: '100%', playerVars: {autoplay: 1, start: 0}})
        })


        // return () => {
        //     socket.off('play-alert')
        //     socket.off('receive-message')
        // }
    }, [opts])

    console.log("autoplay = ", opts.playerVars.autoplay)

    return (
        <div className='video-container'>
            {/* <button onClick={sendMsg}>Reset other players</button> */}
            <YouTube
                key={key}
                className='youtube-player'
                videoId={props.room.videoId}

                onPlay={handlePlay}
                onPause={handlePause}

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
    import React, { useState, useEffect } from 'react'
    import '../../css/Video.css'
    import io from 'socket.io-client'
    import YouTube from 'react-youtube'
    import { Link } from 'react-router-dom'
    import { UilSync } from '@iconscout/react-unicons'
    import { UilSyncSlash } from '@iconscout/react-unicons'

    // Firebase
    import firebase from "firebase/compat/app"
    import "firebase/compat/firestore"
    import "firebase/compat/auth"
    import { auth, firestore } from "../../firebase"
    import { useCollectionData } from "react-firebase-hooks/firestore"

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
        const [sync, setSync] = useState(true)
        const timeRef = firestore.collection(`${props.room.value}time`)
        const query = timeRef.orderBy('createdAt').limit(1)
        const [times] = useCollectionData(query, { idField: 'createdAt' })
        const timeRoom = `${props.room.value}time`
        
        
        // generate unique id
        const generateId = () => {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }

        useEffect(() => {
            if (auth.currentUser.displayName === 'apple pie') return
            const collectionRef = firestore.collection(timeRoom);
            const unsubscribe = collectionRef.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    console.log(change.type)
                    if (change.type === 'added') {
                        setOpts({
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                autoplay: change.doc.data().play? 1 : 0,
                                start: change.doc.data().time
                            }
                        })

                    }
                });
            });
            return unsubscribe;
          }, [times]);
          


        const handlePlay = (event) => {
            if (!sync) return

            console.log("CLIENT: (play event): time = " + event.target.getCurrentTime() + " in room " + props.room.label + " by user " + auth.currentUser.displayName)
            if (auth.currentUser.displayName !== 'apple pie') return

            // socket.emit('play', {
            //     room: props.room.label,
            //     time: event.target.getCurrentTime(),
            //     user: auth.currentUser,
            // })

            const timeRef = firestore.collection(timeRoom)
            timeRef.add({
                time: event.target.getCurrentTime(),
                play: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        
        const handlePause = (event) => {
            console.log("CLIENT: (pause event): time = " + event.target.getCurrentTime())
            // if (auth.currentUser.displayName !== 'apple pie') return

            const timeRef = firestore.collection(timeRoom)
            timeRef.add({
                time: event.target.getCurrentTime(),
                play: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            
            // socket.emit('pause', {
            //     room: props.room.label,
            //     time: event.target.getCurrentTime(),
            //     name: auth.currentUser.displayName,
            // })
        }

        const deleteTime = () => {
            timeRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
        }


        const handleSyncToggle = () => {
            setSync(!sync)
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
                console.log("CLIENT seeking to " + data.time)

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
                return
                console.log("PAUSED")
                console.log('pauser = ', data.name)
                console.log('paued = ', auth.currentUser.displayName)
                if (data.name === auth.currentUser.displayName) {
                    console.log('did nothing')
                    return
                }
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

                const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                const roomRef = firestore.collection(data.room)

                roomRef.add({
                    text: data.message,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    id: id,
                })
            })

            socket.on('join-alert', (data) => {
                console.log(data.message);

                const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                const roomRef = firestore.collection(data.room)

                roomRef.add({
                    text: data.message,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    id: id,
                })
            });

            socket.on('change-room-alert', (data) => {
                if (data.name === auth.currentUser.displayName) {
                    console.log('did nothing')
                    return
                }
                console.log(data.message);

                const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
                const roomRef = firestore.collection(data.prevRoom)

                roomRef.add({
                    text: data.message,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    id: id,
                })
            })
            


            socket.on('receive-message', (data) => {
                if (data.user.displayName === auth.currentUser.displayName) return

                // start video
                console.log("STARTING VIDEO")
                setKey(generateId())
                setOpts({height: '100%', width: '100%', playerVars: {autoplay: 1, start: 0}})
            })


            return () => {
                socket.off('play-alert')
                socket.off('receive-message')
                socket.off('message')
                socket.off('join-alert')
                socket.off('change-room-alert')
            }
        }, [opts])



        return (
            <div className='video-container'>
                <YouTube
                    key={key}
                    className='youtube-player'
                    videoId={props.room.videoId}

                    onPlay={handlePlay}
                    onPause={handlePause}

                    opts={opts}
                />
                <button onClick={deleteTime}>TimeDel</button>
                <div className='room-description'>
                    <div className='room-title'>{props.room.label}</div>
                    <div className='room-desc'>{props.room.desc}</div>
                    <div className='dummy-sync-background'></div>
                    {sync ?
                        <UilSync className='sync' onClick={handleSyncToggle} /> :
                        <UilSyncSlash className='sync' onClick={handleSyncToggle}
                    />}
                </div>
            </div>
        )
    }

    export default Video
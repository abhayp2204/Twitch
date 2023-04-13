import React from 'react'
import '../css/Chat.css'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firebase'

import ChatMessage from './ChatMessage'
import Send from './Send';

function Chat(props) {
    const messagesRef = firestore.collection(props.room.value)
    const query = messagesRef.orderBy('createdAt').limit(25)

    const [messages] = useCollectionData(query, { idField: 'id' })

    return (
        <div className='chat-container'>
            <div className='message-container'>
                {messages && messages.map((msg, key) => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <Send room={props.room} />
        </div>
    )
}

export default Chat
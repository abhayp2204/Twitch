import React from 'react'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase'

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message
    const messageClass = uid === auth.currentUser.uid? "sent" : "received"

    return (
        <Message text={text} photoURL={photoURL} />
    )
}

function Message(props) {
    const { text, photoURL } = props
    return (
        <div className="chat-msg chat-msg-received">
            {photoURL && <img src={photoURL} alt="not found"/>}
            <div className={`${photoURL? 'normal' : 'joining'}`}>{text}</div>   
        </div>
    )
}

export default ChatMessage
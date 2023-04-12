import React from 'react'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatMessage(props) {
    const { text, uid } = props.message
    return (
        <div>{text}</div>
    )
}

export default ChatMessage
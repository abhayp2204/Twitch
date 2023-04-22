import React from 'react'
import '../../css/Chat.css'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase'

import ChatMessage from './ChatMessage'
import Send from './Send';

function Chat(props) {
    const messagesRef = firestore.collection(props.room.value)
    const query = messagesRef.orderBy('createdAt').limit(8)

    const [messages] = useCollectionData(query, { idField: 'id' })

    const deleteMessages = async () => {
        try {
            await messagesRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
        } catch (error) {
            console.log(error);
        }
    };


    const filteredMessages = messages?.filter((msg, index, arr) => {
        if (index === 0) {
          return true; // always include the first message
        }   
        const prevMsg = arr[index - 1];

        if (msg.createdAt === null || prevMsg.createdAt === null) {
            return;
        }


        const timeDiff = msg.createdAt.toMillis() - prevMsg.createdAt.toMillis();
        return timeDiff > 10; // only include messages with a time difference of at least 5 seconds
    });

    return (
        <div className='chat-container'>
            <div className='message-container'>
                {filteredMessages?.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
            </div>
            <button onClick={deleteMessages}>Delete all messages</button>
            <Send room={props.room} />
        </div>
    )
}

export default Chat
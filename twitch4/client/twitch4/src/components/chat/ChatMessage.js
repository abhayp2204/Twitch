import React from 'react'

function ChatMessage(props) {
    const { text, photoURL } = props.message

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
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../css/Chat.css';

function Chat() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3000'); // Change the URL to match your server URL
        setSocket(newSocket);

        newSocket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => newSocket.close();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (message.trim() !== '') {
            socket.emit('chat message', message);
            setMessage('');
        }
    }

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        <div className="message-info">{msg.name} ({msg.time})</div>
                        <div className="message-body">{msg.body}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-container">
                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} className="input-field" placeholder="Type your message here" />
                <button type="submit" className="send-button">&#10148;</button>
            </form>
        </div>
    )
}

export default Chat;

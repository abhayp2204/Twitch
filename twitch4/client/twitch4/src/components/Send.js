// React, Components, Icons
import React, { useState, useRef } from "react"
import ChatMessage from "./ChatMessage"
import "../css/Send.css"

// Firebase
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { auth, firestore } from "../firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"

function Send(props) {
    const messagesRef = firestore.collection(props.room.value)
    const dummy = useRef()
    const [formValue, setFormValue] = useState("")

    const sendMessage = async(e) => {
        e.preventDefault()

        const { uid, photoURL } = auth.currentUser
        
        // No input
        if(!formValue.length) {
            alert("Nothing was typed!")
            return
        }

        // // Censor bad words
        // const badWordText = new Array(formValue.length + 1).join("*")
        // const censoredText = badWords.includes(formValue)? badWordText : 
        
        // generate random id
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        // Add message to firestore
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            id: id,
            photoURL,
        })
        
        dummy.current.scrollIntoView({ behavior: "smooth" }) 
        setFormValue("")
    }

    return (
        <>
            <div ref={dummy} className="dummy"></div>
            <form className="send" onSubmit={sendMessage}>
                <input className="send-input" value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                <button className="send-icon" type="submit">Send</button>
            </form>
        </>
    )
}

export default Send
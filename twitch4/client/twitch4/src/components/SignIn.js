import React from 'react'
import '../css/Auth.css'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../firebase'

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        <div className="sign-in-container">
            <button className="sign-in-btn" onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}

export default SignIn
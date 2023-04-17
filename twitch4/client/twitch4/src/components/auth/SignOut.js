import React from 'react'

// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../firebase'

function SignOut() {
    return auth.currentUser && (
        <button className="sign-out-button" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export default SignOut
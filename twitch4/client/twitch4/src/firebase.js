// firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDIM-y5fxu4NxSz4JTTk9LoySGEPSxQsJc",
    authDomain: "twitch-5058a.firebaseapp.com",
    projectId: "twitch-5058a",
    storageBucket: "twitch-5058a.appspot.com",
    messagingSenderId: "421496328005",
    appId: "1:421496328005:web:8a0ac3951dc1cf54a5782c",
    measurementId: "G-LP6Y6Q4BTX"
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
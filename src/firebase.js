// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase";

# grab config from firebase console
const firebaseApp = firebase.initializeApp({
    apiKey: "<api_key>",
    authDomain: "instagram-clone-react-40aec.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-40aec.firebaseio.com",
    projectId: "instagram-clone-react-40aec",
    storageBucket: "instagram-clone-react-40aec.appspot.com",
    messagingSenderId: "954738200023",
    appId: "1:954738200023:web:585a8e90f78b2c79204f92",
    measurementId: "G-SZ3GSFTC75"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};

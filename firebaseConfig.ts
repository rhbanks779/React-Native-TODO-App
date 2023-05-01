import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
 import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
 import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDBaF-MLBM3GM1ME5ovvODe8FngsPyIwHw",
    authDomain: "firestreamapp-12f15.firebaseapp.com",
    projectId: "firestreamapp-12f15",
    storageBucket: "firestreamapp-12f15.appspot.com",
    messagingSenderId: "1053878965660",
    appId: "1:1053878965660:web:61cd899bb55cc39f3ea459"
  };

//const app = initializeApp(firebaseConfig);
//manually added after setup:
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
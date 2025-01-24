// src/Action/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBG7a_NVyLCg-CmT1Rm8S0zSKOGVcKgxdQ",
  authDomain: "eccomerce-c984a.firebaseapp.com",
  databaseURL: "https://eccomerce-c984a-default-rtdb.firebaseio.com",
  projectId: "eccomerce-c984a",
  storageBucket: "eccomerce-c984a.appspot.com",
  messagingSenderId: "472133523699",
  appId: "1:472133523699:web:394116e2749905c4f7bf86",
  measurementId: "G-SE54B0GPNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database
const rtdb = getDatabase(app); // Realtime Database

export { app, auth, db, rtdb };

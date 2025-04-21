// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

// 🔐 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDxz1TvNfnbj6Q02Dos9lU9-pIPdcR3zy4",
  authDomain: "levyr-e699f.firebaseapp.com",
  projectId: "levyr-e699f",
  storageBucket: "levyr-e699f.appspot.com",
  messagingSenderId: "40694340915",
  appId: "1:40694340915:web:eff11c44fc9b8cf4b37246",
  measurementId: "G-XH9561DF5E"
};

// ✅ Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// ✨ Export Firestore and Auth instances
export { db, auth };


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, onSnapshot,getDoc  } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyxRpN__D0lX8wDQxMKuRa5RqPoLZdfbc",
  authDomain: "dzmovies-95a0c.firebaseapp.com",
  projectId: "dzmovies-95a0c",
  storageBucket: "dzmovies-95a0c.firebasestorage.app",
  messagingSenderId: "345837916837",
  appId: "1:345837916837:web:4132665034701ef798334c"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services for use in your app
export { auth, db, createUserWithEmailAndPassword, setDoc, doc,signInWithEmailAndPassword ,collection, onSnapshot,getFirestore,getDoc };


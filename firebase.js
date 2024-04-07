// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP6Elp69JljdrLvwXCBgMqmlAP8WmQYL4",
  authDomain: "mobiledev-1f182.firebaseapp.com",
  projectId: "mobiledev-1f182",
  storageBucket: "mobiledev-1f182.appspot.com",
  messagingSenderId: "237695875290",
  appId: "1:237695875290:web:e6f95ca6476b3739948de3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
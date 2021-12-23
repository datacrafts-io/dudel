// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0PmBRYggqJPVx6QXo61-U_m7CVl6KeB4",
  authDomain: "dc-dudel.firebaseapp.com",
  databaseURL: "https://dc-dudel-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dc-dudel",
  storageBucket: "dc-dudel.appspot.com",
  messagingSenderId: "1026877941669",
  appId: "1:1026877941669:web:35b242f4cf3199044f6a4c",
  measurementId: "G-YB5D23ZC9F"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)

export { app, analytics, db }

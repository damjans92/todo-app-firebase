// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA79UcREbSiuDWyo6Y89h_srWtH7XpZq2M",
  authDomain: "react-todo-firebase-85e77.firebaseapp.com",
  databaseURL: "https://react-todo-firebase-85e77-default-rtdb.firebaseio.com",
  projectId: "react-todo-firebase-85e77",
  storageBucket: "react-todo-firebase-85e77.appspot.com",
  messagingSenderId: "1036177734648",
  appId: "1:1036177734648:web:8ef7c872868a21f8ca340d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();

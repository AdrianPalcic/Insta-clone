// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5bGI0gLLq6u2ExAzAL6mf7WIO2BM_vGI",
  authDomain: "googo-38ea2.firebaseapp.com",
  projectId: "googo-38ea2",
  storageBucket: "googo-38ea2.appspot.com",
  messagingSenderId: "250375500169",
  appId: "1:250375500169:web:bdf0868862cb0e82973158",
  measurementId: "G-BDNEJT32TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "mediflow-lf2v3",
  "appId": "1:950592207153:web:81d4dbba7906cb947f9810",
  "storageBucket": "mediflow-lf2v3.firebasestorage.app",
  "apiKey": "AIzaSyCqJYCNEn_q96PkZHJUKC7c9irq4_s6PP0",
  "authDomain": "mediflow-lf2v3.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "950592207153"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

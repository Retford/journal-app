// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzjwX8eUI_ujpjfLU-RvNNAidtAAHJ7V8',
  authDomain: 'journal-app-5bc27.firebaseapp.com',
  projectId: 'journal-app-5bc27',
  storageBucket: 'journal-app-5bc27.appspot.com',
  messagingSenderId: '1022694776123',
  appId: '1:1022694776123:web:a2239cbc059b25d0d92b1e',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCSeyNhgIO7RDjHiSOWtVkZ6UyC0FrLhNA",
//   authDomain: "job-matching-2ca49.firebaseapp.com",
//   projectId: "job-matching-2ca49",
//   storageBucket: "job-matching-2ca49.appspot.com",
//   messagingSenderId: "56529155124",
//   appId: "1:56529155124:web:ffe863f0a30c679cef8661",
//   measurementId: "G-0VK8LV7LX0",
//   databaseURL:
//     "https://job-matching-2ca49-default-rtdb.asia-southeast1.firebasedatabase.app/",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtime = getDatabase(app);

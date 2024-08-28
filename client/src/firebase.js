/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d7f9b.firebaseapp.com",
  projectId: "mern-blog-d7f9b",
  storageBucket: "mern-blog-d7f9b.appspot.com",
  messagingSenderId: "422288010080",
  appId: "1:422288010080:web:d747462a1a3b4041c20c05",
  measurementId: "G-H5R5Z8K3LJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

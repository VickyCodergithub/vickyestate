// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vicky-real-estate-app.firebaseapp.com",
  projectId: "vicky-real-estate-app",
  storageBucket: "vicky-real-estate-app.appspot.com",
  messagingSenderId: "284773456597",
  appId: "1:284773456597:web:d46bf2a763ebf86a59205c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
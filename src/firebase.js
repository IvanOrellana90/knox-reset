// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8iO_4B_0hc-ToRQbNwQjARSxf46v6H7I",
  authDomain: "knox-restart-auth.firebaseapp.com",
  projectId: "knox-restart-auth",
  storageBucket: "knox-restart-auth.appspot.com",
  messagingSenderId: "149338005670",
  appId: "1:149338005670:web:d0cc6e94f04a97390a1467",
  measurementId: "G-8T5KNN2ENR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);   

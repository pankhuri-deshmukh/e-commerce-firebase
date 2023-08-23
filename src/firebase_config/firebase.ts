// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAd7MB-Yeglwi2Jtc4Nc4Av0dR04RaIq0",
  authDomain: "e-commerce-application-3e523.firebaseapp.com",
  projectId: "e-commerce-application-3e523",
  storageBucket: "e-commerce-application-3e523.appspot.com",
  messagingSenderId: "113071493941",
  appId: "1:113071493941:web:cf1948b2a4d4008e8af27c",
  measurementId: "G-ND47D9TFN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
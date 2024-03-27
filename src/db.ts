// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXutAAO30QwguKwDZEOCXEYtm-sxnVj60",
  authDomain: "gym-nation-romania.firebaseapp.com",
  projectId: "gym-nation-romania",
  storageBucket: "gym-nation-romania.appspot.com",
  messagingSenderId: "528725938296",
  appId: "1:528725938296:web:8d036600c766503a97dd8d",
  measurementId: "G-RC4VFRXSXF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

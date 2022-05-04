// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-6vuC6q1UwMIvOpRLM30Vn4hLIW7nsjY",
  authDomain: "tuyu-database.firebaseapp.com",
  projectId: "tuyu-database",
  storageBucket: "tuyu-database.appspot.com",
  messagingSenderId: "950025547590",
  appId: "1:950025547590:web:a982d5b2ac7cff8f22bf47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//EXPORTAR LA BASE DE DATOS DE FIRESTORE PARA USARLA EN LA APP                  
export const db = getFirestore(app);
// Nicole de Oliveira Cafalloni
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0nQUihoiIkQUtf5D7QqMOeyNUXviOzC4",
  authDomain: "auth-firebase-projeto-au-4ab15.firebaseapp.com",
  projectId: "auth-firebase-projeto-au-4ab15",
  storageBucket: "auth-firebase-projeto-au-4ab15.firebasestorage.app",
  messagingSenderId: "674593146087",
  appId: "1:674593146087:web:500e6c1042fb8f4abe0e42",
  measurementId: "G-Z30KLKRY2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs , getFirestore};
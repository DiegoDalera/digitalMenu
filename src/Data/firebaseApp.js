// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Asegúrate de importar getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdiMX2VAG6antLy2x4hFil-JNcnkyWIPE",
  authDomain: "menudigital-7667d.firebaseapp.com",
  projectId: "menudigital-7667d",
  storageBucket: "menudigital-7667d.appspot.com",
  messagingSenderId: "1018786639328",
  appId: "1:1018786639328:web:58e4f8805d7bbf180a0f85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Aquí se utiliza getStorage

export default app;

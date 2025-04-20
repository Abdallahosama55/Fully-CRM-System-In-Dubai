// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBW0EIlTOOo1VJ1bJJ-CSUrW6x3_jqVX5U",
  authDomain: "vverse-chat-test.firebaseapp.com",
  databaseURL: "https://vverse-chat-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vverse-chat-test",
  storageBucket: "vverse-chat-test.appspot.com",
  messagingSenderId: "161369172932",
  appId: "1:161369172932:web:53bb00cdc3d2e1e022d291",
  measurementId: "G-03S4ZN92W0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "demo");

const database = getDatabase(app);

export default database;

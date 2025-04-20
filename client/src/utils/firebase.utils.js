// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDUsMAWcdWKNGMWP7GZczQOn4IWEFg71O8",
  authDomain: "chate-55aa4.firebaseapp.com",
  projectId: "chate-55aa4",
  storageBucket: "chate-55aa4.appspot.com",
  messagingSenderId: "932857886117",
  appId: "1:932857886117:web:ae271781c37cc7d4d4244c",
  measurementId: "G-R743GXWKT8",
};

export const updateFirebaseTicketDate = async (ticketId, companyId, data) => {
  const db = getDatabase();
  const ticketRef = ref(db, `Company/${companyId}/ticket`);
  update(ticketRef, { [ticketId]: data });
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

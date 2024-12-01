import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9h5rYlkVJ9JsO7lYQy_EynPeAxcG0zKQ",
  authDomain: "mtm6404-contact-book-rea-fe6d7.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-fe6d7",
  storageBucket: "mtm6404-contact-book-rea-fe6d7.firebasestorage.app",
  messagingSenderId: "439090068053",
  appId: "1:439090068053:web:34320536ed731ae00a72dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
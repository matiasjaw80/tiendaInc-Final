import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBUxb7p_LjyGSJJkZQo05CcxUKD9fpvsKA",
  authDomain: "tiendainc-95afe.firebaseapp.com",
  projectId: "tiendainc-95afe",
  storageBucket: "tiendainc-95afe.appspot.com",
  messagingSenderId: "514205950916",
  appId: "1:514205950916:web:4e8174dba0aad3291bfa91"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
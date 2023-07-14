import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuQI-G2-bzdKqIGNjTH94W7RKZ_oJEkLs",
  authDomain: "seacinema-56c52.firebaseapp.com",
  projectId: "seacinema-56c52",
  storageBucket: "seacinema-56c52.appspot.com",
  messagingSenderId: "905847835834",
  appId: "1:905847835834:web:f29912049c89c8e5390683",
  measurementId: "G-99G4ER00GR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
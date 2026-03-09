import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase project config from Console
const firebaseConfig = {
  apiKey: "AIzaSyCC4ZtG1E1OWGVzhjjK0Mp0NrV58piCu0I",
  authDomain: "weight-tracker-d851c.firebaseapp.com",
  projectId: "weight-tracker-d851c",
  storageBucket: "weight-tracker-d851c.firebasestorage.app",
  messagingSenderId: "403522202862",
  appId: "1:403522202862:web:5579c951a3bfa9378357ff",
  measurementId: "G-DNRM78LJ2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

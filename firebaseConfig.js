// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";

// Firebase configuration (ensure proper security rules in the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyCujDKOCQXUpi3PilsccAg7ZYJvyBPJIY8",
  authDomain: "chat-app-77fff.firebaseapp.com",
  projectId: "chat-app-77fff",
  storageBucket: "chat-app-77fff.appspot.com", // Corrected storageBucket URL
  messagingSenderId: "516983539985",
  appId: "1:516983539985:web:1b7c26675d2b0ffb28a4b0",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native Persistence
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,  // Corrected this line
});

// Initialize Firestore Database
export const db = getFirestore(app);

// Export Firestore References
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");

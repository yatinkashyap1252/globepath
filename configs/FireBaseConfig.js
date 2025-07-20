// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "ai-travel-app-3a063.firebaseapp.com",
  projectId: "ai-travel-app-3a063",
  storageBucket: "ai-travel-app-3a063.firebasestorage.app",
  messagingSenderId: "726100835582",
  appId: "1:726100835582:web:e6419b0c695800b97b39af",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const auth=getAuth(app)

export const db = getFirestore(app);

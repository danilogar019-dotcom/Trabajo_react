import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE1gEt_O8uDNtgo4nhhOxWtek-9WXIfBc",
  authDomain: "basewanderland.firebaseapp.com",
  projectId: "basewanderland",
  storageBucket: "basewanderland.firebasestorage.app",
  messagingSenderId: "186994207391",
  appId: "1:186994207391:web:9de36efb1fe80fc39c90aa",
  measurementId: "G-C29BHBQKXC"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
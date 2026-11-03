import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const requiredEnvironment = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} as const;

const missingEnvironment = Object.entries(requiredEnvironment)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingEnvironment.length > 0) {
  throw new Error(`Missing Firebase configuration: ${missingEnvironment.join(", ")}`);
}

export const firebaseApp = getApps()[0] ?? initializeApp(requiredEnvironment);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

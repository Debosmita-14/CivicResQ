import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "civicresq.firebaseapp.com",
  projectId: "civicresq",
  storageBucket: "civicresq.firebasestorage.app",
  messagingSenderId: "863423760552",
  appId: "1:863423760552:web:015ec6a84949c88874da9d",
  measurementId: "G-4L5H56M6V2",
};

// Lazy-initialize Firebase only on the client side to prevent SSR build errors
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

function getFirebaseApp() {
  if (typeof window === "undefined") return undefined;
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

function getFirebaseAuth(): Auth {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) throw new Error("Firebase not initialized (SSR)");
    auth = getAuth(firebaseApp);
  }
  return auth;
}

function getFirebaseDb(): Firestore {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (!firebaseApp) throw new Error("Firebase not initialized (SSR)");
    db = getFirestore(firebaseApp);
  }
  return db;
}

export { getFirebaseAuth as auth, getFirebaseDb as db };

export const googleProvider = new GoogleAuthProvider();

export function setupRecaptcha(containerId: string) {
  return new RecaptchaVerifier(getFirebaseAuth(), containerId, {
    size: "invisible",
    callback: () => {},
  });
}

export default getFirebaseApp;

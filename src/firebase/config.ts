import { initializeApp } from "firebase/app";
// @ts-expect-error Firebase RN export exists at runtime, but TS typings can miss it
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZMDQEK7SOtwn0MzwQk5CaEgVR0m0RiE4",
  authDomain: "egg-tracker-3da36.firebaseapp.com",
  projectId: "egg-tracker-3da36",
  storageBucket: "egg-tracker-3da36.firebasestorage.app",
  messagingSenderId: "940442331134",
  appId: "1:940442331134:web:153ea7c28a42b3ad3f42af",
};

const app = initializeApp(firebaseConfig);

// Firebase Auth pro React Native s perzistencí do AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore zatím bez custom offline cache konfigurace
export const db = getFirestore(app);
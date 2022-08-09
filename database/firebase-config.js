import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import 'firebase/firestore'
import { set } from 'react-native-reanimated';

const firebaseConfig = {
  apiKey: "AIzaSyAR0RqLqjMI06no426X74LlKVEH6e83EN8",
  authDomain: "lacasamakibackend.firebaseapp.com",
  projectId: "lacasamakibackend",
  storageBucket: "lacasamakibackend.appspot.com",
  messagingSenderId: "928186827388",
  appId: "1:928186827388:web:5a03fd9d0a07bdfb777ff9"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const DB = getFirestore(app);
export {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  Timestamp,
  arrayUnion,
  updateDoc,
  deleteDoc
}


export const Ref = collection(DB, 'Chat')
export const q = query(Ref, orderBy('createdAt'), limit(20) )



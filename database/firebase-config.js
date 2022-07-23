import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
import 'firebase/firestore'

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
  doc, 
  setDoc, 
  getDoc, 
  onAuthStateChanged,
  signInWithEmailAndPassword, 
}

export async function getProfile(email) {
  const docRef = doc(DB, "userProfile", email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return null
}
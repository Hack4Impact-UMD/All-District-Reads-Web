import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  writeBatch,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export const addUser = async (sessionId: string) => {
  await setDoc(doc(db, "userActivity", sessionId), {
    type: "Online",
    creation: serverTimestamp(),
  });
};

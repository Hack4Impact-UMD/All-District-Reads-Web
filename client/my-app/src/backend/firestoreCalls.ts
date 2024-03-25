import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase';
import { ReadingSchedule } from '../types/types';

export function addReadingSchedule(readingSchedule: ReadingSchedule): Promise<string> {
    return new Promise((resolve, reject) => {
      addDoc(collection(db, 'readingSchedules'), readingSchedule)
        .then((docRef) => {
          // return id of reading schedule added
          resolve(docRef.id);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
import {initializeApp} from 'firebase/app';
import {getAuth, sendPasswordResetEmail} from '@firebase/auth';
import {getFunctions, httpsCallable} from 'firebase/functions';

export function createAdminUser(
  email: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const functions = getFunctions();
    const createAdminCloudFunction = httpsCallable(functions, 'createAdminUser');

    createAdminCloudFunction({
      email: email,
      name: "",
      schoolId: "",
      schoolDistrictId: "",
      numChildren: "",
    })
      .then(async () => {
        resolve();
      })
      .catch(error => {
        console.log(error.message);
        reject();
      });
  });
}
import {
  AuthError,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app, { functions } from "../config/firebase";
import { httpsCallable } from 'firebase/functions';
import { User } from "../types/types";

export function authenticateUser(email: string, password: string) {
  return new Promise((resolve, reject) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential.user);
      })
      .catch((error: AuthError) => {
        reject(error);
      });
  });
}

export function registerUser(email: string, password: string) {
  return new Promise((resolve, reject) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential.user);
      })
      .catch((error: AuthError) => {
        reject(error);
      });
  });
}

export function sendCreateAccountEmail(user: User, email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (user.userType !== 'ADRAdmin' && user.userType !== 'ADRStaff') {
      reject(new Error("Incorrect user type"));
    }
    const sendEmailInvitation = httpsCallable(
      functions,
      'updateUserEmail'
    )
    sendEmailInvitation(email)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      })

  })
}

export async function sendInvitationEmail(email: string) {
  try {
    const templateParams = {
      to_email: email,
      message: 'You have been invited to create an account. Click on the following link to get started: '
    };

    // this function should be a cloud firestore function, but if we don't want to do that yet, we can try using the emailjs libary 

    // await emailjs.send(
    //   'YOUR_SERVICE_ID', // Your email service ID from EmailJS dashboard
    //   'YOUR_TEMPLATE_ID', // Your email template ID from EmailJS dashboard
    //   templateParams,
    //   'YOUR_USER_ID' // Your email user ID from EmailJS dashboard
    // );

    console.log('Invitation email sent successfully');
  } catch (error) {
    console.error('Error sending invitation email:', error);
  }
};
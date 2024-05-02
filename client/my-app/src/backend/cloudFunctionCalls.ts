import {getFunctions, httpsCallable} from 'firebase/functions';
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

export function createAdminUser(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const functions = getFunctions();
    const createAdminCloudFunction = httpsCallable(
      functions,
      "createAdminUser",
    );

    createAdminCloudFunction({
      email: email,
      name: "",
      schoolId: "",
      schoolDistrictId: "",
      numChildren: "",
      userType: "ADRAdmin"
    })
      .then(async () => {
        resolve();
      })
      .catch((error) => {
        console.log(error.message);
        reject(error);
      });
  });
}

export function createADRStaffUser(
  email: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const functions = getFunctions();
    const createADRStaffCloudFunction = httpsCallable(functions, "createADRStaffUser");

    createADRStaffCloudFunction({
      email: email,
      name: "test",
      numChildren: 2,
      schoolId: "",
      schoolDistrictId: "",
      userType: "ADRStaff",
    })
      .then(async () => {
        resolve();
      })
      .catch(error => {
        console.log(error.message);
        reject(error);
      });
  });
}

export function createSchoolStaffUser(
  email: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const functions = getFunctions();
    const createADRStaffCloudFunction = httpsCallable(functions, "createSchoolStaffUser");

    createADRStaffCloudFunction({
      email: email,
      name: "test",
      numChildren: 2,
      schoolId: "",
      schoolDistrictId: "",
      userType: "SchoolStaff",
    })
      .then(async () => {
        resolve();
      })
      .catch(error => {
        console.log(error.message);
        reject(error);
      });
  });
}

export function 

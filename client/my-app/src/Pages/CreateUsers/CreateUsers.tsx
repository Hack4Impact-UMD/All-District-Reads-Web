// CreateUsers.tsx
import { UserType, canCreateUserType } from '../../types/types';
import './CreateUsers.css';
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  FirebaseApp,
  FirebaseOptions,
  initializeApp,
  getApp,
} from "firebase/app";
import firebaseConfig from "../../config/firebase"; // Make sure to provide the correct path to your Firebase config
import { createAdminUser, createADRStaffUser, createSchoolStaffUser} from "../../backend/cloudFunctionCalls";
import { useNavigate } from "react-router-dom";


// Initialize Firebase app
let firebaseApp: FirebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
} catch (error) {
  firebaseApp = getApp(); // If the app is already initialized, get the existing app
}

interface Props {
  currentUserType: UserType;
}

const CreateUsers: React.FC<Props> = ({ currentUserType }) => {

  const getAvailableUserTypes = () => {
    switch (currentUserType) {
      case UserType.ADRAdmin:
        return [UserType.ADRAdmin, UserType.ADRStaff, UserType.SchoolStaff];
      case UserType.ADRStaff:
        return [UserType.SchoolStaff];
      default:
        return []; // Empty array if no creation rights
    }
  };

  const [availableUserTypes, setAvailableUserTypes] = useState<UserType[]>(getAvailableUserTypes());
  const [newUserType, setNewUserType] = useState<UserType>();
  const [message, setMessage] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registrationButtonClicked, setRegistrationButtonClicked] =
    useState(false); // State to track if registration button is clicked
  const [registrationError, setRegistrationError] = useState(""); // State to store registration error message
  const [currentPage, setCurrentPage] = useState<"home" | "wrong" | null>(null); // State to track current page
  const navigate = useNavigate();


  const handleRegister = async () => {
    const auth = getAuth(firebaseApp);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registrationEmail,
        registrationPassword,
      );
      if (newUserType == UserType.ADRAdmin){
        await createAdminUser(registrationEmail);
      }

      if (newUserType == UserType.ADRStaff){
        await createADRStaffUser(registrationEmail);
      }

      if (newUserType == UserType.SchoolStaff){
        await createSchoolStaffUser(registrationEmail);
      }
      console.log("Registration successful:", userCredential.user);
      setRegistrationButtonClicked(true); // Set registrationButtonClicked to true when registration button is clicked
      setRegistrationError("");
      setRegistrationEmail(""); // Clear email input
      setRegistrationPassword(""); // Clear password input
      // Optionally, you can redirect to another page after successful registration
    } catch (error: any) {
      console.error("Registration error:", error.message);
      setRegistrationError("Registration error: " + error.message);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <div>Registeration Success!</div>;
      case "wrong":
        return <div>Registeration not successful</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create New User</h2>

        <select className = "userOptions" value={newUserType} onChange={(e) => setNewUserType(e.target.value as UserType)}>
        {availableUserTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
            type="email"
            placeholder="Username or Email"
            value={registrationEmail}
            onChange={(e) => setRegistrationEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={registrationPassword}
            onChange={(e) => setRegistrationPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Create User</button>
          {registrationError && <p>{registrationError}</p>}
          {registrationButtonClicked && <p>Register button clicked!</p>}
          {renderPage()}
        
        <p>{message}</p>
      </div>
    </div>
  );
};

export default CreateUsers;



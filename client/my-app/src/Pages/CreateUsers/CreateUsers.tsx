// CreateUsers.tsx
import { UserType, canCreateUserType } from "../../types/types";
import "./CreateUsers.css";
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
import {
  createAdminUser,
  createADRStaffUser,
  createSchoolStaffUser,
} from "../../backend/cloudFunctionCalls";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../Components/Auth/AuthProvider";


// Initialize Firebase app
let firebaseApp: FirebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
} catch (error) {
  firebaseApp = getApp(); // If the app is already initialized, get the existing app
}

const CreateUsers: React.FC = () => {
  const authContext = useAuth();

  const getAvailableUserTypes = () => {
    console.log(authContext);
    switch (authContext.userType) {
      case UserType.ADRAdmin:
        return [UserType.ADRAdmin, UserType.ADRStaff, UserType.SchoolStaff];
      case UserType.ADRStaff:
        return [UserType.SchoolStaff];
      default:
        return []; // Empty array if no creation rights
    }
  };

  const [availableUserTypes, setAvailableUserTypes] = useState<UserType[]>(
    getAvailableUserTypes(),
  );
  const [newUserType, setNewUserType] = useState<UserType>();
  const [message, setMessage] = useState("");
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
      if (newUserType == UserType.ADRAdmin) {
        await createAdminUser(registrationEmail);
      }

      if (newUserType == UserType.ADRStaff) {
        await createADRStaffUser(registrationEmail);
      }

      if (newUserType == UserType.SchoolStaff) {
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
    <div className="user-container">
      <div className="user-form-container">
        <img
          src="https://alldistrictreads.org/wp-content/uploads/2023/07/All-District-Reads.png"
          alt="navbar-logo"
          className="adr-logo"
        />
        <h2>Create New User</h2>
        <div className="heading-text">Select new user type</div>

        <div className="userOptions">
          {availableUserTypes.map((type) => (
            <label key={type} className="userOption">
              <input
                type="radio"
                name="userType"
                value={type}
                checked={newUserType === type}
                onChange={(e) => setNewUserType(e.target.value as UserType)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        <input
          type="email"
          placeholder="Username or Email"
          value={registrationEmail}
          onChange={(e) => setRegistrationEmail(e.target.value)}
          className="user-input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={registrationPassword}
          onChange={(e) => setRegistrationPassword(e.target.value)}
          className="user-input-field"
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

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
import { createAdminUser } from "../../backend/cloudFunctionCalls";
//import '../Login.css';

// Initialize Firebase app
let firebaseApp: FirebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
} catch (error) {
  firebaseApp = getApp(); // If the app is already initialized, get the existing app
}

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginButtonClicked, setLoginButtonClicked] = useState(false); // State to track if login button is clicked
  const [loginError, setLoginError] = useState(""); // State to store login error message
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registrationButtonClicked, setRegistrationButtonClicked] =
    useState(false); // State to track if registration button is clicked
  const [registrationError, setRegistrationError] = useState(""); // State to store registration error message
  const [currentPage, setCurrentPage] = useState<"home" | "wrong" | null>(null); // State to track current page

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      setCurrentPage("home");
      console.log("Login successful:", userCredential.user);
      setLoginButtonClicked(true); // Set loginButtonClicked to true when login button is clicked
      setLoginError("");
      setLoginEmail(""); // Clear email input
      setLoginPassword(""); // Clear password input
    } catch (error: any) {
      setCurrentPage("wrong");
      console.error("Login error:", error.message);
      setLoginError("Login error: " + error.message);
    }
  };

  const handleRegister = async () => {
    const auth = getAuth(firebaseApp).setCustomUserClaims();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registrationEmail,
        registrationPassword,
      );
      await createAdminUser(registrationEmail);
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
        return <div>Login Success!</div>;
      case "wrong":
        return <div>Login incorrect</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {loginError && <p>{loginError}</p>}
      {loginButtonClicked && <p>Login button clicked!</p>}
      {renderPage()}
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={registrationEmail}
        onChange={(e) => setRegistrationEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registrationPassword}
        onChange={(e) => setRegistrationPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {registrationError && <p>{registrationError}</p>}{" "}
      {/* Display registration error message */}
      {registrationButtonClicked && <p>Registration successful!</p>}{" "}
      {/* Render message if registration is successful */}
    </div>
  );
}

export default Login;

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
import "./Login.css"; // Import the updated CSS file
import { useNavigate } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState<"home" | "wrong" | null>(null); // State to track current page
  const navigate = useNavigate();
  const goToHome = () => navigate("/home");

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
      goToHome();
    } catch (error: any) {
      setCurrentPage("wrong");
      console.error("Login error:", error.message);
      setLoginError("Login error: " + error.message);
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
    <div className="login-outer-container">
      <div className="login-container">
        <div className="image-container">
          <div className="login-image" />
        </div>
        <div className="login-form-container">
          <img
            src="https://alldistrictreads.org/wp-content/uploads/2023/07/All-District-Reads.png"
            alt="navbar-logo"
            className="adr-logo"
          />
          <h3>Login</h3>
          <hr className="separator" />

          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="login-input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="login-input-field"
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default Login;

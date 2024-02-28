import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, FirebaseOptions, initializeApp, getApp } from 'firebase/app'; 
import firebaseConfig from "../config/firebase";

// Check if Firebase app has already been initialized
let firebaseApp: FirebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig as FirebaseOptions);
} catch (error) {
  firebaseApp = getApp(); // If the app is already initialized, get the existing app
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false); // State to track if button is clicked

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);
    setEmail(''); // Reset email field
    setPassword(''); // Reset password field
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      setButtonClicked(true); // Set buttonClicked to true when button is clicked
      // Redirect or perform other actions on successful login
      
    } catch (error:any) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {buttonClicked && <p>Login button clicked!</p>} // Render message if button is clicked
    </div>
  );
}

export default Login;

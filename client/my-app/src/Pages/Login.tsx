import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, FirebaseOptions, initializeApp, getApp } from 'firebase/app';
import firebaseConfig from '../config/firebase'; // Make sure to provide the correct path to your Firebase config
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
//import { useNavigate } from 'react-router-dom';


// Initialize Firebase app
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
  const [loginError, setLoginError] = useState(''); // State to store login error message
  const [currentPage, setCurrentPage] = useState<'home' | 'wrong' | null >(null); // State to track current page
  //const navigate = useNavigate();

  const handleLogin = async () => {
    const auth = getAuth(firebaseApp);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentPage('home');
      console.log('Login successful:', userCredential.user);
      setButtonClicked(true); // Set buttonClicked to true when button is clicked
      setLoginError('');

    } catch (error:any) {
        setCurrentPage('wrong');
      console.error('Login error:', error.message);
      setLoginError('Login error: ' + error.message);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Router> <Routes><Route path = "/" element = {<Home/>}/></Routes></Router>;
      case 'wrong':
        return <div>Login incorrect</div>;
      default:
        return null;
    }
  }

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
      {loginError && <p>{loginError}</p>}
      {buttonClicked && <p>Login button clicked!</p>}
      {renderPage()}
    </div>
  );
  
}

export default Login;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home/Home";
import Dashboard from './Pages/Dashboard/Dashboard';
import Library from "./Pages/Library/Library";
import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
import Login from "./Pages/Login/Login";
import firebaseConfig from './config/firebase';
import ReadingSchedule from "./Pages/ReadingSchedule/ReadingSchedule";
import { AuthProvider } from './Components/Auth/AuthProvider';

if (!getApps().length) {
  initializeApp(firebaseConfig as FirebaseOptions);
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/schedule" element={<ReadingSchedule />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;

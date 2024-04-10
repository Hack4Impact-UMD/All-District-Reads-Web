import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Dashboard from './Pages/Dashboard';
import Library from "./Pages/Library";
import Schedule from './Pages/Schedule';
import Login from './Pages/Login';
import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import Login from "./Pages/Login";
import Schedule from "./Pages/Schedule";
import { FirebaseOptions, initializeApp } from "firebase/app";
import firebaseConfig from './config/firebase';
import ReadingSchedule from "./ReadingSchedule";

if (!getApps().length) {
  initializeApp(firebaseConfig as FirebaseOptions);
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
          Header!
        </header> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;

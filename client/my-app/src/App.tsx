import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Library from "./Pages/Library/Library";
import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
import Login from "./Pages/Login/Login";
import firebaseConfig from "./config/firebase";
import ReadingSchedule from "./Pages/ReadingSchedule/ReadingSchedule";
import CreateUsers from "./Pages/CreateUsers/CreateUsers";
import { UserType } from "./types/types";
import Navbar from "./Components/Navbar/Navbar";

if (!getApps().length) {
  initializeApp(firebaseConfig as FirebaseOptions);
}

const App: React.FC = () => {
  const location = useLocation();
  const currentUserType = UserType.ADRAdmin;
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/schedule" element={<ReadingSchedule />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/createUsers"
          element={<CreateUsers />}
        />
      </Routes>
    </div>
  );
};

export default App;

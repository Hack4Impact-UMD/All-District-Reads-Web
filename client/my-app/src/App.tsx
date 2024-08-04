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
import RequireAdminAuth from "./Components/Auth/RequireAdminAuth/RequireAdminAuth";
import RequireADRStaffAuth from "./Components/Auth/RequireADRStaffAuth/RequireADRStaffAuth";
import RequireSchoolStaffAuth from "./Components/Auth/RequireSchoolStaffAuth/RequireSchoolStaffAuth";
import { AuthProvider, useAuth } from "./Components/Auth/AuthProvider";




if (!getApps().length) {
  initializeApp(firebaseConfig as FirebaseOptions);
}

const App: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname !== "/" && <Navbar />}
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" 
          element={
          <RequireAdminAuth>
            <Library />
          </RequireAdminAuth>
          }
        />
        
        <Route path="/schedule" 
          element={
          <RequireSchoolStaffAuth>
            <ReadingSchedule />
          </RequireSchoolStaffAuth>
          } 
        />
        
        <Route path="/home" element={<Home />} />

        <Route
          path="/createUsers"
          element={<CreateUsers/>}
        />
      </Routes>
      </AuthProvider>
      
    </div>
  );
};

export default App;

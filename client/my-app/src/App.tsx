// import "./App.css";

// import React from 'react';
// import ReactDOM from 'react-dom';
// import Login from './Pages/Login';
// import Schedule from './Pages/Schedule';
// import { FirebaseOptions, initializeApp } from "firebase/app";
// import firebaseConfig from './config/firebase';
// import Library from "./Pages/Library";
// import Dashboard from './Pages/Dashboard';
// import Home from "./Pages/Home"

// const App: React.FC = () => {
//   return (
//     <div className="App">

//       <header className="App-header">Hello world!</header>

//       <Login />
//     </div>
//   );
// }

// const Apps = () => {
//   return (
//     <div className="App">
//       <header className="App-header">Hello world!</header>
//     </div>
//   );
// }


// // Initialize Firebase
// const app = initializeApp(firebaseConfig as FirebaseOptions);

// const AppF = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         Hello world!
//       </header>
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Dashboard from './Pages/Dashboard';
import Library from "./Pages/Library";
import Schedule from './Pages/Schedule';
import Login from './Pages/Login';
import { FirebaseOptions, initializeApp, getApps } from "firebase/app";
import firebaseConfig from './config/firebase';

// Initialize Firebase only if there isn't an instance already
if (!getApps().length) {
  initializeApp(firebaseConfig as FirebaseOptions);
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          Hello world!
        </header>
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

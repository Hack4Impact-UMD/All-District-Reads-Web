import "./App.css";

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Pages/Login';
import Schedule from './Pages/Schedule';
import { FirebaseOptions, initializeApp } from "firebase/app";
import firebaseConfig from './config/firebase';
import ReadingSchedule from "./ReadingSchedule";

const App: React.FC = () => {
  return (
    <div className="App">
      
      <header className="App-header">Hello world!</header>

      <ReadingSchedule />
    </div>
  );
}

const Apps = () => {
  return (
    <div className="App">
      <header className="App-header">Hello world!</header>
    </div>
  );
}


// Initialize Firebase
const app = initializeApp(firebaseConfig as FirebaseOptions);

const AppF = () => {
  return (
    <div className="App">
      <header className="App-header">
        Hello world!
      </header>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
// App.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { FirebaseOptions, initializeApp } from "firebase/app";
import firebaseConfig from './config/firebase'; // Assuming this is the correct path to your firebaseConfig file

// Initialize Firebase
const app = initializeApp(firebaseConfig as FirebaseOptions);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Hello world!
      </header>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
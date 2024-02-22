import './App.css';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBH7dOlLD1LQ8HZvRxLq6VdUGwYcSGUYAQ",
  authDomain: "all-district-reads-f4e27.firebaseapp.com",
  projectId: "all-district-reads-f4e27",
  storageBucket: "all-district-reads-f4e27.appspot.com",
  messagingSenderId: "652762895994",
  appId: "1:652762895994:web:c9385f66d3f75f524f0dc3",
  measurementId: "G-NRTXT0YXP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Hello world!
      </header>
    </div>
  );
}

export default App;

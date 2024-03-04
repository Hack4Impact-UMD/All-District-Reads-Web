import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Pages/Login';
import Schedule from './Pages/Schedule';
import Home from './Pages/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Weekly Schedule</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
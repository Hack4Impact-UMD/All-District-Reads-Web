import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Pages/Login';

const App: React.FC = () => {
  return (
    <div>
      <h1>All District Reads Login</h1>
      <Login />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
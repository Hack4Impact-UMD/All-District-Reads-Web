import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Pages/Login';
import Schedule from './Pages/Schedule';




const App: React.FC = () => {
  return (

    
    <div>
      <Login />
     
      
    </div>
       
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
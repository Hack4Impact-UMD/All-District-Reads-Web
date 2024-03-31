
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Pages/Login';
import reportWebVitals from './reportWebVitals';
import ReadingSchedule from './ReadingSchedule';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>

    {/* <App /> */}
    <ReadingSchedule />
  </React.StrictMode>

);

reportWebVitals();

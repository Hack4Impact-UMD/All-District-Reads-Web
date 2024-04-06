import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Login from './Pages/Login';
import ReadingSchedule from './ReadingSchedule'; // Include the ReadingSchedule component

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ReadingSchedule /> {/* Use ReadingSchedule component */}
  </React.StrictMode>
);

reportWebVitals();

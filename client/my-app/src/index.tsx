
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import Library from "./Pages/Library";
// import Login from './Pages/Login';
// import Dashboard from './Pages/Dashboard';
// import Home from "./Pages/Home";



// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement,
// );
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     {/*<App />*/}
//     <Home />
//   </React.StrictMode>
// );

// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Find the root of your app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render the App component instead of Home
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Call the function to report web vitals
reportWebVitals();

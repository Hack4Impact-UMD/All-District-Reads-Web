import "./App.css";
import { useOnline } from "./backend/useOnline";
import { useEffect } from "react";
function App() {
  useOnline();
  return (
    <div className="App">
      <header className="App-header">Hello world!</header>
    </div>
  );
}

export default App;

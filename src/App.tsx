import React from "react";
import "./App.css";
import { Timer } from "./components/Timer/Timer.component";

function App() {
  return (
    <div className="App">
      <div className="App-timer">
        <Timer />
      </div>
    </div>
  );
}

export default App;

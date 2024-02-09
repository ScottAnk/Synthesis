import "./App.css";
import ControlPanel from "./components/ControlPanel.js";
import { start_tone } from "./common/core.js";
import { useState } from "react";

function App() {
  let [tone_status, set_tone_status] = useState("off");

  return (
    <div className="App">
      <h1>Welcome to Synthesis</h1>
      <h3>Synthesis is {tone_status}</h3>
      {tone_status === "off" ? (
        <button onClick={() => start_tone(set_tone_status)}>start</button>
      ) : (
        <ControlPanel tone_status={tone_status}></ControlPanel>
      )}
    </div>
  );
}

export default App;

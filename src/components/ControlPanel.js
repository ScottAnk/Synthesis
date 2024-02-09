import { useState, useEffect, useMemo, useRef } from "react";
import Synth from "../common/Synth.js";


function ControlPanel() {
  // let [synth, synth_status] = useSynth();
  let [synth_status, set_synth_status] = useState("");
  const synth = useMemo(() => new Synth(set_synth_status, true), []);

  return (
    <div className="ControlPanel">
      <h3>Synthesis is {synth_status}</h3>
      <button hidden={synth_status !== "off"} onClick={() => synth.start()}>
        start
      </button>
      <button onClick={() => synth.toggle_debug()}>
        toggle debug
      </button>

      <div className="keys">
        {synth.range.map((note, index) => (
          <button
            key={index}
            hidden={synth_status === "off"}
            onClick={() => synth.play_note(note)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;

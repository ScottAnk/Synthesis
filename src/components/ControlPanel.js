import { useState, useEffect, useMemo, useRef } from "react";
import Synth from "../common/Synth.js";

function ControlPanel() {
  const synth = useMemo(() => new Synth(null, true), []);

  return (
    <div className="ControlPanel">
      <button onClick={() => synth.toggle_debug()}>toggle debug</button>

      <div className="keys">
        {synth.range.map((note, index) => (
          <button key={index} onClick={() => synth.play_note(note)}>
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;

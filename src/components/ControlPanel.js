import { useState, useEffect, useMemo } from "react";
import * as Tone from "tone";
import * as ranges from "../common/ranges.js";

function ControlPanel() {
  const range = ranges.one_five;
  const transport = Tone.Transport;
  const get_synth = () => new Tone.AMSynth().toDestination();

  const synth = useMemo(() => get_synth(), []);
  transport.debug = true;

  // test schedule

  transport.bpm.value = 180;
  transport.scheduleRepeat((time) => {
    get_synth().triggerAttackRelease("C3", "8n", time);
  }, "4n");
  transport.scheduleRepeat((time) => {
    get_synth().triggerAttackRelease("B2", "8n", time);
  }, "1n");

  //end test schedule
  const transport_play_pause = () => {
    if (transport.state !== "started") {
      transport.start();
    } else {
      transport.pause();
    }
  };

  const transport_stop = () => {
    transport.stop();
  };

  return (
    <div className="ControlPanel">
      <div>
        <button onClick={() => synth.toggle_debug()}>toggle debug</button>
      </div>
      <div>
        <button onClick={transport_play_pause}>play/pause transport</button>
        <button onClick={transport_stop}>stop transport</button>
      </div>
      <h3>play around</h3>
      <div className="keys">
        {range.map((note, index) => (
          <button
            key={index}
            onClick={() => get_synth().triggerAttackRelease(note, "8n")}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ControlPanel;

import { useState, useEffect, useMemo } from "react";
import * as Tone from "tone";
import * as ranges from "../common/ranges.js";

const instruments = [];

function ControlPanel() {
  let [loop_addition, set_loop_addition] = useState({
    note: "C2",
    cadence: "0:1:0",
    duration: "16n",
    start: "0:0:0",
    stop: "16:0:0",
    instrument: null,
    scheduled: false,
    key: 0,
  });

  const range = ranges.one_five;
  const transport = Tone.Transport;
  transport.bpm.value = 180;
  const get_synth = () => new Tone.AMSynth().toDestination();
  const sample_instrument = useMemo(
    () => new Tone.AMSynth().toDestination(),
    []
  );

  const synth = useMemo(() => get_synth(), []);
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

  const modify_loop_addition = (prop, value) => {
    set_loop_addition({ ...loop_addition, [prop]: value, scheduled: false });
  };

  const add_loop_element = () => {
    if (loop_addition.scheduled) {
      console.log("repeat addition");
      return;
    }
    if (
      !(
        loop_addition.note &&
        loop_addition.duration &&
        loop_addition.cadence &&
        loop_addition.start &&
        loop_addition.stop
      )
    ) {
      console.log("missing loop_addition property");
      return;
    }

    instruments[loop_addition.key] = get_synth();
    instruments[loop_addition.key].debug = true;
    const play_note = function () {
      this.triggerAttackRelease(loop_addition.note, loop_addition.duration);
    }.bind(instruments[loop_addition.key]);
    transport.scheduleRepeat(
      play_note,
      loop_addition.cadence,
      loop_addition.start
      // loop_addition.stop // I'll probably put this back in once I get a better GUI going
    );
    loop_addition.scheduled = true;
    loop_addition.key += 1;
  };

  return (
    <div className="ControlPanel">
      <div>
        <button onClick={transport_play_pause}>play/pause transport</button>
        <button onClick={transport_stop}>stop transport</button>
      </div>
      <h3>build a loop</h3>
      <label>
        cadence
        <input
          type="text"
          onChange={(e) => modify_loop_addition("cadence", e.target.value)}
          value={loop_addition.cadence}
        />
      </label>
      <label>
        duration
        <input
          type="text"
          onChange={(e) => modify_loop_addition("duration", e.target.value)}
          value={loop_addition.duration}
        />
      </label>
      <label>
        start (bars:quarters:sixteenths)
        <input
          type="text"
          onChange={(e) => modify_loop_addition("start", e.target.value)}
          value={loop_addition.start}
        />
      </label>
      <div className="keys">
        <p>Note {loop_addition.note ? loop_addition.note : "none"}</p>
        {range.map((note, index) => (
          <button
            key={index}
            onClick={() => {
              sample_instrument.triggerAttackRelease(note, "8n");
              modify_loop_addition("note", note);
            }}
          >
            {note}
          </button>
        ))}
      </div>
      <button onClick={add_loop_element}>add to loop</button>
    </div>
  );
}

export default ControlPanel;

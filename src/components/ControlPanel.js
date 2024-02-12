import { useState, useEffect, useMemo } from "react";
import * as Tone from "tone";
import * as ranges from "../common/ranges.js";

function ControlPanel() {
  let [loop_addition, set_loop_addition] = useState({
    note: "C2",
    cadence: "1:0:0",
    duration: "16n",
    start: "0:0:0",
    stop: "16:0:0",
    instrument: null,
    scheduled: false,
  });

  const range = ranges.one_five;
  const transport = Tone.Transport;
  transport.bpm.value = 180;
  const get_synth = () => new Tone.AMSynth().toDestination();

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

    console.log("adding loop element");
    console.log(loop_addition);

    transport.scheduleRepeat(
      () => {
        const instrument = get_synth();
        instrument.debug = true;
        instrument.triggerAttackRelease(
          loop_addition.note,
          loop_addition.duration
        );
      },
      loop_addition.cadence,
      loop_addition.start
      // loop_addition.stop
    );
    loop_addition.scheduled = true;
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
      {/* <label>
        stop (bars:quarters:sixteenths)
        <input
          type="text"
          onChange={(e) => modify_loop_addition("stop", e.target.value)}
          value={loop_addition.stop}
        />
      </label> */}
      <div className="keys">
        <p>Note {loop_addition.note ? loop_addition.note : "none"}</p>
        {range.map((note, index) => (
          <button
            key={index}
            onClick={() => {
              get_synth().triggerAttackRelease(note, "8n");
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

import * as Tone from "tone";
import * as ranges from "./ranges";

class Synth extends Tone.Synth {
  constructor(status_sender = null, debug = false) {
    super();
    this.debug = debug;
    this.range = ranges.two_five;
    this.status_sender = status_sender;
    this._init_synth();
  }

  _set_status(status) {
    this.status = status;
    if (this.status_sender) {
      this.status_sender(this.status);
    }
  }

  toggle_debug() {
    this.debug = !this.debug;
    this.synth.debug = this.debug;
  }

  _init_synth() {
    this._set_status("ready");
  }

  play_note(note, time) {
    this.triggerAttackRelease(note, "8n", time);
    this._set_status("playing");
  }
}

export default Synth;

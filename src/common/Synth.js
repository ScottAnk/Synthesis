import * as Tone from "tone";
import * as ranges from "./ranges";

class Synth {
  constructor(status_sender = null, debug = false) {
    this.debug = debug;
    this.synth = null;
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
    this.synth = new Tone.Synth().toDestination();
    this.synth.debug = this.debug;
    this._set_status("ready");
  }

  play_note(note) {
    if (!this.synth) {
      this.start();
      return;
    }

    this.synth.triggerAttackRelease(note, "8n");
    this._set_status("playing");
  }
}

export default Synth;

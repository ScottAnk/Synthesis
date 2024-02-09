// import { Tone } from "tone";
import * as Tone from "tone";

export function start_tone(set_status = null) {
  Tone.start();
  if (set_status) {
    set_status("on");
  }
}

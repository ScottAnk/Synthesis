// import { Tone } from "tone";
import * as Tone from "tone";

export async function start_tone(set_status = null) {
  await Tone.start();
  if (set_status) {
    set_status("on");
  }
}

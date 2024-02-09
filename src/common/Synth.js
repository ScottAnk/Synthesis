import * as Tone from 'tone';
import * as ranges from './ranges';

class Synth{
  constructor(status_sender, debug = false){
    this.debug = debug
    this.synth=null;
    this.status="off";
    this.range = ranges.seven_octave;
    this.status_sender=status_sender;
    this.send_status();
  }

  send_status(){
    if(this.status_sender){
      this.status_sender(this.status);
    }
  }

  toggle_debug(){
    this.debug = !this.debug;
    this.synth.debug = this.debug;
  }

  start(){
    this.synth = new Tone.Synth().toDestination();
    this.synth.debug=this.debug;
    this.status = "ready";
    this.send_status();
  }

  play_note (note){
    if(!this.synth) {
      this.start();
      return
    }

    this.synth.triggerAttackRelease(note, "8n");
    this.status="playing";
    this.send_status();
  }

}


export default Synth
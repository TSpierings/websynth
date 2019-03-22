import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-front-panel',
  templateUrl: './front-panel.component.html',
  styleUrls: ['./front-panel.component.scss']
})
export class FrontPanelComponent implements OnInit {
  private audioContext: AudioContext;
  private osc: OscillatorNode;
  private gainNode: GainNode;
  private convolverNode: ConvolverNode;
  private impulseResponse: ArrayBuffer;

  constructor() { }

  ngOnInit() {
    this.audioContext = new AudioContext();
    this.initGain();
    this.initConvolver();
    this.initOsc();
  }

  changeFrequency(frequency: number) {
    this.osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    this.audioContext.resume();
  }

  enterFile(event) {
    const fr = new FileReader();
    const file = event.target.files[0];
    fr.readAsArrayBuffer(file);
    fr.onloadend = () => {
      this.impulseResponse = fr.result as ArrayBuffer;
      this.initConvolver();
    };
  }

  private initOsc() {
    this.osc = this.audioContext.createOscillator();
    this.osc.frequency.value = 0;

    if (!isNullOrUndefined(this.convolverNode)) {
      this.osc.connect(this.convolverNode);
    } else {
      this.osc.connect(this.gainNode);
    }

    this.osc.start();
    this.osc.type = 'square';
  }

  //#region init methods
  private initConvolver() {
    if (!isNullOrUndefined(this.impulseResponse)) {
      this.convolverNode = this.audioContext.createConvolver();

      this.audioContext.decodeAudioData(this.impulseResponse, (buffer) => {
        this.convolverNode.buffer = buffer;
      }, (e) => { console.log(e); });

      this.convolverNode.connect(this.gainNode);

      this.osc.disconnect();
      this.osc.connect(this.convolverNode);
    }
  }

  private initGain() {
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(this.audioContext.destination);
  }
  //#endregion
}

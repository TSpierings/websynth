import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-front-panel',
  templateUrl: './front-panel.component.html',
  styleUrls: ['./front-panel.component.scss']
})
export class FrontPanelComponent implements OnInit {
  private audioContext: AudioContext;
  private gainNode: GainNode;
  private convolverNode: ConvolverNode;
  private impulseResponse: ArrayBuffer;

  frequency = 0;
  oscillatorOutputNode: AudioNode;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.audioContext = new AudioContext();
    this.initGain();
    this.initConvolver();
  }

  changeFrequency(frequency: number) {
    this.frequency = frequency;
    this.audioContext.resume();
    this.cd.detectChanges();
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

  //#region init methods
  private initConvolver() {
    if (!isNullOrUndefined(this.impulseResponse)) {
      this.convolverNode = this.audioContext.createConvolver();

      this.audioContext.decodeAudioData(this.impulseResponse, (buffer) => {
        this.convolverNode.buffer = buffer;
      }, (e) => { console.log(e); });

      this.convolverNode.connect(this.gainNode);
      this.oscillatorOutputNode = this.convolverNode;
    }
  }

  private initGain() {
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(this.audioContext.destination);
    this.oscillatorOutputNode = this.gainNode;
  }
  //#endregion
}

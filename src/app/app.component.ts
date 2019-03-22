import { Component, OnInit, HostListener } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private audioContext: AudioContext;
  private osc: OscillatorNode;
  private gainNode: GainNode;
  private convolverNode: ConvolverNode;
  private frequency = 440;
  private octave = 1;
  private mouseDown = false;

  private impulseResponse: ArrayBuffer;

  ngOnInit() {
    this.audioContext = new AudioContext();
    this.initGain();
    this.initConvolver();
    this.initOsc();
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

  playKey(frequency: number) {
    this.tuneOsc(frequency, this.octave);
    this.gainNode.gain.value = 1.0;
  }

  //#region swipe
  swipe(event: MouseEvent) {
    const x = event.pageX - (event.srcElement as HTMLDivElement).offsetLeft;
    const y = event.pageY - (event.srcElement as HTMLDivElement).offsetTop;

    if (this.mouseDown) {
      this.octave = (100 / (y + 1)) / 4;
      this.playKey(440 + (x / 1000) * 440);
    }
  }

  @HostListener('mousedown')
  onMousedown() {
    this.audioContext.resume();
    this.mouseDown = true;
  }

  @HostListener('mouseup')
  onMouseup() {
    this.mouseDown = false;
  }
  //#endregion

  stop() {
    this.gainNode.gain.value = 0.0;
  }

  setOctave(value: number) {
    if (this.octave <= 1 && value === 1) {
      this.octave *= 2;
    } else if (this.octave <= 1 && value === -1) {
      this.octave /= 2;
    } else {
      this.octave += value;
    }

    this.tuneOsc(this.frequency, this.octave);
  }

  base64ToArrayBuffer(base64) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++)        {
          bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
  }

  private initOsc() {
    this.osc = this.audioContext.createOscillator();
    this.osc.frequency.value = this.frequency;

    if (!isNullOrUndefined(this.convolverNode)) {
      this.osc.connect(this.convolverNode);
    } else {
      this.osc.connect(this.gainNode);
    }

    this.osc.start();
    this.osc.type = 'square';
  }

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
    this.gainNode.gain.value = 0;
    this.gainNode.connect(this.audioContext.destination);
  }

  private tuneOsc(frequency: number, octave: number) {
    this.frequency = frequency;
    this.octave = octave;
    this.osc.frequency.setValueAtTime(this.frequency * this.octave, this.audioContext.currentTime);
  }
}

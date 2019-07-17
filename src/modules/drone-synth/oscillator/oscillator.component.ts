import { Component, OnInit, Input } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit {

  @Input() number: number;
  @Input() destination: AudioNode;
  @Input() audioContext: AudioContext;

  private oscillatorNode: OscillatorNode;
  private gainNode: GainNode;

  constructor() { }

  ngOnInit() {
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 1.0;
    this.gainNode.connect(this.destination);

    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.frequency.value = 0;
    this.oscillatorNode.type = 'sine';
    this.oscillatorNode.start();
    this.oscillatorNode.connect(this.gainNode);
  }

  setFrequency(value: number) {
    if (value === 0) {
      this.gainNode.gain.value = 0;
    } else {
      this.gainNode.gain.value = 1;
    }

    this.oscillatorNode.frequency.value = value * 10;
  }

}

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

  constructor() { }

  ngOnInit() {
    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.frequency.value = 0;
    this.oscillatorNode.type = 'sine';
    this.oscillatorNode.start();

    if (!isNullOrUndefined(this.destination)) {
      this.oscillatorNode.connect(this.destination);
    }
  }

  setFrequency(value: number) {
    this.oscillatorNode.frequency.value = value * 10;
  }

}

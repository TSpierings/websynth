import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})
export class OscillatorComponent implements OnInit, OnChanges {
  @Input() audioContext: AudioContext;
  @Input() outputNode: AudioNode;
  @Input() frequency: number;

  private oscillatorNode: OscillatorNode;

  constructor() { }

  ngOnInit() {
    this.oscillatorNode = this.audioContext.createOscillator();
    this.oscillatorNode.frequency.value = 0;
    this.oscillatorNode.type = 'square';
    this.oscillatorNode.start();

    if (!isNullOrUndefined(this.outputNode)) {
      this.oscillatorNode.connect(this.outputNode);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isNullOrUndefined(this.oscillatorNode)) {
      return;
    }

    if (changes['frequency'] != null) {
      this.oscillatorNode.frequency.setValueAtTime(this.frequency, this.audioContext.currentTime);
    }

    if (changes['outputNode'] != null) {
      this.oscillatorNode.disconnect();
      this.oscillatorNode.connect(this.outputNode);
    }
  }
}

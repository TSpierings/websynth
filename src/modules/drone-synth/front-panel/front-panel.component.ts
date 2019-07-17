import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-panel',
  templateUrl: './front-panel.component.html',
  styleUrls: ['./front-panel.component.scss']
})
export class FrontPanelComponent implements OnInit {

  public oscillatorBank: Array<number>;
  public gainNode: GainNode;
  public audioContext: AudioContext;

  constructor() { }

  ngOnInit() {
    this.audioContext = new AudioContext();
    this.initGain();

    this.oscillatorBank = [];

    for (let i = 0; i < 12; i++) {
      this.oscillatorBank.push(i);
    }
  }

  private initGain() {
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0.5;
    this.gainNode.connect(this.audioContext.destination);
  }

}

import { Component, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-board',
  templateUrl: './slider-board.component.html',
  styleUrls: ['./slider-board.component.scss']
})
export class SliderBoardComponent implements OnInit {
  @Input() boardWidth = 1000;
  @Input() boardHeight = 100;
  @Output() frequencyChange = new EventEmitter<number>();

  private baseFrequency = 440;
  private mouseDown = false;

  constructor() {}

  ngOnInit() {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then((midiAccess) => {
          midiAccess.inputs.forEach((value, key) => {
            console.log(`MIDI device: ${value.name}`);
            value.onmidimessage = this.onMidiMessage;
          });
        })
        .catch((error) => console.log(error));
    }
  }

  swipe(event: MouseEvent) {
    const x = event.pageX - (event.srcElement as HTMLDivElement).offsetLeft;
    const y = event.pageY - (event.srcElement as HTMLDivElement).offsetTop;

    if (this.mouseDown) {
      const octave = (this.boardHeight / (y + 1)) / 4;
      const frequency = this.baseFrequency + (x / this.boardWidth) * this.baseFrequency;
      this.frequencyChange.emit(octave * frequency);
    }
  }

  @HostListener('mousedown')
  onMousedown() {
    this.mouseDown = true;
  }

  @HostListener('mouseup')
  onMouseup() {
    this.mouseDown = false;
  }

  stop() {
    this.frequencyChange.emit(0);
  }

  onMidiMessage = (midiEvent: WebMidi.MIDIMessageEvent) => {
    const data = midiEvent.data;
    if (data.length === 3) {
      const status = data[0];
      const command = status >>> 4;

      if (command === 0x9) {
        const note = data[1];
        const velocity = data[2];

        const frequency = 440 * Math.pow(2, (note - 69) / 12);
        this.frequencyChange.emit(frequency);
      }

      if (command === 0x8) {
        this.frequencyChange.emit(0);
      }
    }
  }

}

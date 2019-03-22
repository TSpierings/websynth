import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider-board',
  templateUrl: './slider-board.component.html',
  styleUrls: ['./slider-board.component.scss']
})
export class SliderBoardComponent {
  @Input() boardWidth = 1000;
  @Input() boardHeight = 100;
  @Output() frequencyChange: EventEmitter<number>;

  private baseFrequency = 440;
  private mouseDown = false;

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

}
